const User = require("../models/userModel");
const { sign } = require("../utils/JsonWebToken");
const hashPassword = require("../utils/hashPassword");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthDate, email, address, avatar, password, description } = req.body;

    if (!firstName || !lastName || !birthDate || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already used" });

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

    const token = sign({ uuid: newUser.uuid, email: newUser.email }, "24h");

    res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
module.exports = signup;