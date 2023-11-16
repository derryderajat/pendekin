// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const { registerUser, signinUser } = require("../user/user.service");
const { ERR } = require("../helper/Response.template");
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
    console.log(error.message);
    if (error.message.includes("contain")) {
      return res.status(400).json({ error: error.message });
    } else if (error.message === "User is already Exists") {
      res.status(409).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
});
router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const loggedIn = await signinUser(username, password);
    res.status(200).json(loggedIn);
    return;
  } catch (error) {
    console.log(error.message);
    if (error.message === "username or password can't be empty") {
      res.status(400).json(ERR(error.message));
      return;
    }
    res.status(500).json(ERR("Internal Server Error"));
    return;
  }
});


module.exports = router;
