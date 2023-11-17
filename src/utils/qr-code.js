const qr = require("node-qr-image");
const imagekit = require("./imagekit");
const generateQRWithLogo = async (data, fileName, protocol, host) => {
  const imageUrl = `${protocol}://${host}/qr/${fileName}.png`;
  var png_string = qr.imageSync(data, { type: "png" });
  const buffer = Buffer.from(png_string.buffer);
  try {
    // Upload the image
    const uploadResponse = await imagekit.upload({
      file: buffer, // Buffer data
      fileName: fileName + ".png",
      tags: ["qr"], // optional
    });

    return { success: true, url: uploadResponse.thumbnailUrl };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
  // return { url: imageUrl, string: buffer };
};

module.exports = {
  generateQRWithLogo,
};
