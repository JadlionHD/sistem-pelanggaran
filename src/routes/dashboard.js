const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");

  // testing pakai admin
  res.render("dashboard/index.ejs", { user: req.user });
});

router.get("/pelanggaran", (req, res) => {
  res.send("Hello world");
});

router.get("/peringatan", (req, res) => {
  res.send("Hello world");
});

router.get("/tambah", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
