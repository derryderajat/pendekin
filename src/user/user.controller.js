// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
// const prisma = require("../db");

const { getAllUsers } = require("./user.service");

const router = express.Router();
router.get("/users", async (req, res) => {
  const products = await getAllUsers();
  res.status(200).json(products);
  return;
});

module.exports = router;
