const Joi = require("joi");
const { insertUser } = require("../user/user.repository");

const register = async (newUserData) => {
  const users = await insertUser(newUserData);
  return users;
};

module.exports = {
  register,
};
