const crypto = require("crypto");
const User = require("../models/userModel");
const { sign } = require("../utils/JsonWebToken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ message: "Email and password are required" });
    
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        const hashToVerify = crypto
          .pbkdf2Sync(password, user.passwordSalt, 100000, 64, "sha512")
          .toString("hex");
    
        if (hashToVerify !== user.passwordHash) return res.status(401).json({ message: "Password incorrect" });
    
        const token = sign({ uuid: user.uuid, email: user.email }, "24h");
    
        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = login;