const { verify } = require("../utils/JsonWebToken");

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1]; // format: Bearer <token>
  const decoded = verify(token);

  if (!decoded) return res.status(401).json({ message: "Token invalide ou expiré" });

  req.user = decoded;
  next();
};