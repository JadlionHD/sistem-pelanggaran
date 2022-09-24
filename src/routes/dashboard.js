const { Knex } = require("knex");
const IRoute = require("../abstracts/IRoute");

class Dashboard extends IRoute {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.opt = { name: "dashboard" };
    this.knex = knex;
  }

  run() {
    this.router.get("/", (req, res) => {
      if (!req.user) return res.status(401).send("Unauthorized");

      if (req.user.level === 5 || req.user.level === 0 || req.user.level === 3) {
        res.render("dashboard/admin.ejs", { user: req.user });
      } else if (req.user.level === 1 || req.user.level === 2) {
        res.render("dashboard/guru.ejs", { user: req.user });
      } else if (req.user.level === 4) {
        res.render("dashboard/siswa.ejs", { user: req.user });
      } else {
        return res.render("components/403.ejs", { user: req.user });
      }
    });

    this.router.get("/pelanggaran", (req, res) => {
      res.render("components/403.ejs", { user: req.user });
    });

    this.router.get("/peringatan", (req, res) => {
      res.send("Hello world");
    });

    this.router.get("/tambah", (req, res) => {
      res.send("Hello world");
    });

    return this.router;
  }
}

module.exports = Dashboard;
