// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
// const prisma = require("../db");
const storage = require("../utils/multer");
const { getAllUsers, updateDataUser, uploadImage } = require("./user.service");

const router = express.Router();
const { isAuthenticate, isAuthorize, isUserAvail } = require("../middleware");
const { storingImage } = require("../uploads/multer/multer.service");
router.get("/users", async (req, res) => {
  const products = await getAllUsers();
  res.status(200).json(products);
  return;
});
router.put(
  "/users/:username",
  [isAuthenticate, isAuthorize],
  async (req, res) => {
    try {
      const updated_user_data = req.body;
      const updatingUser = await updateDataUser(
        req.params.username,
        updated_user_data
      );
      res.status(201).json({ message: updatingUser });
      return;
    } catch (error) {
      // console.log(error.message);
      res.status(500).json(ERR("Internal Server Error"));
      return;
    }
  }
);
// storage.image.single("image")

router.put(
  "/users/:username/change-profile",
  [isAuthenticate, isAuthorize, storage.image.single("image")],
  async (req, res) => {
    try {
      const imageUrl = storingImage(
        req.protocol,
        req.get("host"),
        req.file.filename
      );
      const updatingUser = await uploadImage(req.params.username, imageUrl);
      res.status(201).json({ message: updatingUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json(ERR("Internal Server Error"));
    }
  }
);

module.exports = router;
