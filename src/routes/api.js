const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({ message: "Hello world" });
});

router.post("/auth", passport.authenticate("local"));
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout((err) => {
      if (err) return next(err);
    });
    res.redirect("../../");
  } else {
    res.redirect("../../");
  }
});

module.exports = router;
