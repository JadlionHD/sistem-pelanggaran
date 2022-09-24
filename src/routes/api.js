const { Knex } = require("knex");
const IRoute = require("../abstracts/IRoute");

class API extends IRoute {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.opt = { name: "api" };
    this.knex = knex;
  }

  run() {
    this.router.get("/hello", (req, res) => {
      console.log(this.toJSON);
      if (!req.user) return res.status(401).send("Unauthorized");
      if (req.user.level !== 5) return res.status(401).send("Unauthorized");
      res.json({ message: "Hello world" });
    });

    return this.router;
  }
}

module.exports = API;
