const bcrypt = require("bcrypt");

const hashingPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const passwordIsCorrect = await bcrypt.compare(password, hashedPassword);
  return passwordIsCorrect;
};
module.exports = { hashingPassword, comparePassword };
