// Untuk komunikasi dengan database
// kalau ganti" orm tinggal edit bag. ini saja

const prisma = require("../db");
const findUsers = async () => {
  try {
    const users = await prisma.Users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        photo_profile: true,
      },
    });
    return users;
  } catch (error) {
    // Tangani kesalahan dan lemparkan kembali
    throw new Error("Error fetching users from the database");
  }
};

const insertUser = async (userData) => {
  try {
    const user = await prisma.Users.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      select: {
        username: true,
        email: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

const isUserExist = async (username, email) => {
  const emailExists = await prisma.Users.count({
    where: { email: email },
  });
  const usernameExists = await prisma.Users.count({
    where: { username: username },
  });

  return emailExists + usernameExists;
};

module.exports = {
  findUsers,
  insertUser,
  isUserExist,
};
