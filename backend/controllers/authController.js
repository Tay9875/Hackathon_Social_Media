// controllers/authController.js
const crypto = require("crypto");
const User = require("../models/userModel");
const { sign } = require("../utils/JsonWebToken");

// 🔐 fonction utilitaire pour hacher un mot de passe
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

// 🧾 Inscription
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;

    if (!firstName || !lastName || !birthDate || !email || !password)
      return res.status(400).json({ message: "Champs requis manquants" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const { salt, hash } = hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      adress,
      avatar,
      passwordHash: hash,
      passwordSalt: salt,
      description,
    });

    const token = sign({ uuid: newUser.uuid, email: newUser.email }, "24h");

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔑 Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const hashToVerify = crypto
      .pbkdf2Sync(password, user.passwordSalt, 100000, 64, "sha512")
      .toString("hex");

    if (hashToVerify !== user.passwordHash)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = sign({ uuid: user.uuid, email: user.email }, "24h");

    res.status(200).json({ message: "Connexion réussie", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
