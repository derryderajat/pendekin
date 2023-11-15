const bcrypt = require("bcrypt");

const hashingPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = hashingPassword;
