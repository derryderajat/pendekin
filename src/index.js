const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("public/images"));
app.use("/files", express.static("public/files"));
app.use("/qr", express.static("public/qr"));
app.use(express.static("public"));

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("OK");
});
app.get("/ping", (req, res) => {
  res.send("pong");
});

const userController = require("./user/user.controller");
const authController = require("./auth/auth.controller");
const mediaController = require("./uploads/multer/multer.controllers");
const linksController = require("./link/link.controller");
// Membuat router untuk versi 1
const v1Router = express.Router();
v1Router.use("/", [
  userController,
  authController,
  mediaController,
  linksController,
]);

// Membuat router untuk path "/v1" yang mengarah ke router versi 1
const routerV1 = express.Router();
routerV1.use("/v1", v1Router);

// Menggunakan router versi 1 pada path "/api"
app.use("/api", routerV1);

if (process.env.NODE_MD === "dev") {
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
}
