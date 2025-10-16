const crypto = require("crypto");
const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return { salt, hash };
}

module.exports = hashPassword;