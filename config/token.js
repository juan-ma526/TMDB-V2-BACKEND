const jwt = require("jsonwebtoken");

const SECRET = "tmdb";

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
