const prisma = require("../db");
const createUrl = async (user_id, original, short, qr_link) => {
  // user_id String
  //   original       String
  //   short          String    @unique
  //   qr_link         String
  try {
    const newLink = await prisma.links.create({
      data: {
        user: { connect: { id: user_id } },
        original: original,
        short: short,
        qr_link: qr_link,
      },
    });

    return newLink;
  } catch (error) {
    throw new Error(error);
  }
};
const getOriginalLink = async (short) => {
  console.log(short);
  try {
    const originalLink = await prisma.links.findFirst({
      where: {
        short: {
          endsWith: short,
        },
      },
      select: {
        original: true,
        short: true,
      },
    });
    return originalLink;
  } catch (error) {
    throw new Error("Not Found");
  }
};
const getShort = async (short) => {};
module.exports = {
  createUrl,
  getOriginalLink,
};
