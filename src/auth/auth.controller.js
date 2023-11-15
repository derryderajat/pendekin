// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const { registerUser } = require("../user/user.service");
const router = express.Router();
router.post("/auth/register", async (req, res) => {
  const newUserData = req.body;
  try {
    const newUser = await registerUser(newUserData);
    console.log(newUser);
    if (newUser !== null) {
      res.status(201).json({ success: "created" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("ERROR:", error);

    if (error.message === "User is already Exists") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
