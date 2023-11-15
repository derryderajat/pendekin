// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const { findUsers, isUserExist, insertUser } = require("./user.repository");
const Joi = require("joi");
const hashingPassword = require("../utils/bcrypt");
const schemaRegister = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/(?=.*[a-z])/) //Memeriksa setidaknya ada satu huruf kecil.
    .regex(/(?=.*[A-Z])/) // Memeriksa setidaknya ada satu huruf besar.
    .regex(/(?=.*\d)/) // Memeriksa setidaknya ada satu angka.
    .required(),
});
const getAllUsers = async () => {
  const users = await findUsers();
  return users;
};

const registerUser = async (newUserData) => {
  // validate data user
  try {
    const { error, value } = await schemaRegister.validateAsync(newUserData);
    if (error) throw new Error(error);
  } catch (validationError) {
    console.error(validationError); // Log validation error
    throw new Error(validationError);
  }

  try {
    // Validate whether the user already exists
    const { username, email } = newUserData;
    const userAlreadyExists = await isUserExist(username, email);
    if (userAlreadyExists > 0) {
      throw new Error("User is already Exists");
    }

    // hashing password
    const hashedPassword = await hashingPassword(newUserData.password);
    newUserData.password = hashedPassword;

    // add user to the database from the repository
    try {
      const newUser = await insertUser(newUserData);
      return newUser;
    } catch (error) {
      return null;
    }
  } catch (error) {
    throw new Error(error); // Log the original error for debugging
  }
};

module.exports = {
  getAllUsers,
  registerUser,
};
