const crypto = require("crypto");
const secret = process.env.TOKEN_SECRET || "secret_key_change_me";

function base64urlEncode(obj) {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str) {
  const base = str.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(base, "base64").toString("utf8"));
}

function parseExp(exp) {
  if (typeof exp === "number") return exp;
  const match = exp.match(/^(\d+)([smhd])$/);
  if (!match) return 3600;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  return unit === "s" ? value
    : unit === "m" ? value * 60
    : unit === "h" ? value * 3600
    : unit === "d" ? value * 86400
    : 3600;
}

function sign(payload, expiresIn = "1h") {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + parseExp(expiresIn);
  const body = { ...payload, exp };

  const headerEncoded = base64urlEncode(header);
  const bodyEncoded = base64urlEncode(body);

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${headerEncoded}.${bodyEncoded}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${headerEncoded}.${bodyEncoded}.${signature}`;
}

function verify(token) {
  try {
    const [headerB64, bodyB64, signature] = token.split(".");
    const checkSig = crypto
      .createHmac("sha256", secret)
      .update(`${headerB64}.${bodyB64}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (checkSig !== signature) return null;

    const payload = base64urlDecode(bodyB64);
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

module.exports = { sign, verify };