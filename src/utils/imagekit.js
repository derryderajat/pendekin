const ImageKit = require("imagekit");
// SDK initialization
require("dotenv").config();

const {
    
IMAGE_KIT_PUBKEY,
IMAGE_KIT_PRIKEY,
ENDPOINT_QR
} = process.env

const imagekit = new ImageKit({
    publicKey : IMAGE_KIT_PUBKEY,
    privateKey : IMAGE_KIT_PRIKEY,
    urlEndpoint : ENDPOINT_QR
});

module.exports = imagekit;