require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const createToken = async (payload) => {
  const tokenExpiration = 24 * 60 * 60;
  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: tokenExpiration,
    algorithm: "HS256",
  });
  return token;
};
const verifyToken = (token) => {
  let user;
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error("Token is invalid or expired");
    }

    // Check if the token is not expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new Error("Token has expired");
    }
    user = decoded;
  });
  return user;
};
module.exports = { createToken, verifyToken };
