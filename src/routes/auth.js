const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) return res.redirect("../../dashboard");
});
router.get("/logout", (req, res, next) => {
  if (req.user) {
    req.logout((err) => {
      if (err) return next(err);
    });
    res.redirect("../../");
  } else {
    res.status(401).send("Unauthorized");
    //res.redirect("../../");
  }
});

module.exports = router;
