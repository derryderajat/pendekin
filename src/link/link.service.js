const { generateQRWithLogo } = require("../utils/qr-code");
const { createUrl, getOriginalLink } = require("./link.repository");

const pendekin = async (user_id, original, short, protocol, host) => {
  const data = original;
  // const fileName = Date.now();
  // const qr = await generateQRWithLogo(data, fileName, protocol, host);
  // const { url } = qr;
  const shortLink = `${protocol}://${host}/s/${short}`;
  let newLink;
  try {
    newLink = await createUrl(user_id, original, shortLink, "");
  } catch (error) {
    throw new Error("short already exists");
  }
  return { message: "ok", link: newLink.short };
};

const getLink = async (short) => {
  const originalLink = getOriginalLink(short);
  return originalLink;
};
module.exports = { pendekin, getLink };
