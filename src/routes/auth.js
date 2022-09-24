const { Knex } = require("knex");
const passport = require("passport");
const IRoute = require("../abstracts/IRoute");

class Auth extends IRoute {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.opt = { name: "auth" };
    this.knex = knex;
  }

  run() {
    this.router.post("/login", passport.authenticate("local"), (req, res) => {
      if (req.user) return res.redirect("../../dashboard");
    });

    this.router.get("/logout", (req, res, next) => {
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

    return this.router;
  }
}

module.exports = Auth;
