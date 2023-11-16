// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const {
  findUsers,
  isUserExist,
  insertUser,
  findUserByUsername,
  updateUser,
  changeProfile,
} = require("./user.repository");
const Joi = require("joi");

const { hashingPassword, comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");
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
    throw Error(validationError.message);
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
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const signinUser = async (username, password) => {
  try {
    // check is user exist
    if (!username && !password) {
      throw new Error("username or password can't be empty");
    }
    const user = await findUserByUsername(username);
    if (!user) throw new Error("Username is not found");

    let isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    let selectedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    // 1 day expired
    let token = await createToken(selectedUser);
    return { access_token: token, data: selectedUser };
  } catch (error) {
    throw error;
  }
};

const updateDataUser = async (username, updatedUserData) => {
  const user = updateUser(username, updatedUserData);
  return "User is Updated";
};
const uploadImage = async (username, imageURI) => {
  const user = changeProfile(username, imageURI);
  return "Profile Image is updated";
};
const findByusername = async (username) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("Username is not found");
  return user;
};
module.exports = {
  getAllUsers,
  registerUser,
  signinUser,
  updateDataUser,
  uploadImage,
  findByusername,
};
