const express = require("express");
const router = express.Router();
const { isAuthenticate, isAuthorize, isUserAvail } = require("../middleware");
const { pendekin, getLink } = require("./link.service");
const randomstring = require("randomstring");
const { getOriginalLink } = require("./link.repository");
const { ERR } = require("../helper/Response.template");
router.post("/links", [isAuthenticate], async (req, res) => {
  let short;
  if (!req.body.short) {
    while (true) {
      short = randomstring.generate(6);
      const isShortAlreadyExists = await getOriginalLink(short);
      if (!isShortAlreadyExists) {
        break;
      }
    }
  } else {
    short = req.body.short;
    const isShortAlreadyExists = await getOriginalLink(short);
    if (isShortAlreadyExists) {
      res.status(409).json(ERR("short already exists"));
      return;
    }
  }
  try {
    const shorteningUrl = await pendekin(
      req.user.id,
      req.body.original,
      short,
      req.protocol,
      req.get("host")
    );
    res.status(201).json(shorteningUrl);
    return;
  } catch (error) {
    // console.log(error.message);
    if (error.message === "short already exists") {
      res.status(409).json(ERR("short already exists"));
      return;
    }
    res.status(500).json(ERR("Internal Server Error"));
    return;
  }
});

router.get("/s/:link", async (req, res) => {
  try {
    const originalLink = await getLink(req.params.link);
    res.redirect(originalLink.original);
    return;
  } catch (error) {
    if (error.message.includes("Cannot read properties of null")) {
      res.status(404).json(ERR("Short Not Found"));
      return;
    }
    res.status(500).json(ERR("Internal Server Error"));
    return;
  }
});

module.exports = router;
