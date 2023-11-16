const storingImage = (protocol, host, filename) => {
  const imageUrl = `${protocol}://${host}/images/${filename}`;
  return imageUrl;
};
// below should refactor
const storageImage = (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  return res.status(200).json({
    status: true,
    message: "success",
    data: {
      image_url: imageUrl,
    },
  });
};
const storageImages = (req, res) => {
  let respArr = [];
  for (let index = 0; index < req.files.length; index++) {
    const element = req.files[index];
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      element.filename
    }`;
    respArr.push(imageUrl);
  }
  res.status(200).json({
    status: true,
    message: "success",
    data: {
      image_urls: respArr,
    },
  });
  return;
};

const storageVideo = (req, res) => {
  const videoUrl = `${req.protocol}://${req.get("host")}/videos/${
    req.file.filename
  }`;

  return res.status(200).json({
    status: true,
    message: "success",
    data: {
      video_url: videoUrl,
    },
  });
};
const storageFile = (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/files/${
    req.file.filename
  }`;

  return res.status(200).json({
    status: true,
    message: "success",
    data: {
      file_url: fileUrl,
    },
  });
};

module.exports = {
  storageImage,
  storageVideo,
  storageFile,
  storageImages,
  storingImage,
};
