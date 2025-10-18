const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const hashPassword = require("../utils/hashPassword");

const AuthError = require("../errors/authError");
const UserError = require("../errors/userError");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthDate, email, address, avatar, password, description } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) throw AuthError.invalidEmail();

    if (!firstName || !lastName || !birthDate || !email || !password) throw UserError.missingFields();

    const existing = await User.findOne({ email });
    if (existing) throw AuthError.existingEmail();

    const { salt, hash } = hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      address,
      avatar,
      password,
      description,
    });

    const userAgent = req.headers["user-agent"] || "unknown";
    const ipAddress = req.ip || req.socket.remoteAddress || "";
    const tokenValue = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await Token.deleteMany({ userUuid: newUser.uuid });
    await Token.create({
      tokenValue,
      userUuid: newUser.uuid,
      userAgent,
      ipAddress,
      expiresAt,
      tokenName: "auth",
    });

    res.status(201).json({
      message: "User created successfully",
      token: tokenValue,
      expiresAt,
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
module.exports = signup;