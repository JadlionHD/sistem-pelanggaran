const fs = require("fs");
const bodyparser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    // this.sequelize = null;
  }

  init() {
    this.setExpress();
    this.setModels();
  }

  setExpress() {
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.app.use(bodyparser.json());

    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../resources/views"));
    this.app.use("/static", express.static(path.join(__dirname, "../public")));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        cookie: {
          maxAge: 60000 * 60 * 24
        },
        resave: true,
        saveUninitialized: true,
        store: new MySQLStore({
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASS,
          database: process.env.MYSQL_DB_NAME,
          port: parseInt(process.env.MYSQL_PORT),
          expiration: 60000 * 60 * 24,
          createDatabaseTable: true,
          connectionLimit: 1,
          schema: {
            tableName: "express_sessions"
          }
        })
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.get("/", (req, res) => {
      console.log("ROOT", req.user);
      if (req.user) return res.redirect("../../dashboard");
      res.render("login.ejs");
    });

    this.app.listen(process.env.EXPRESS_PORT || 3000, () => {
      console.log("Ready");
    });
  }

  setModels() {
    const knex = require("knex").default({
      client: "mysql",
      connection: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB_NAME
      },
      log: {
        debug(message) {
          console.log(`[MYSQL DEBUG]`, message);
        },
        error(message) {
          console.log(`[MYSQL ERROR]`, message);
        },
        warn(message) {
          console.log(`[MYSQL WARN]`, message);
        }
      },
      debug: process.env.MYSQL_LOG === "true" ? true : false
    });

    // Register Models
    fs.readdirSync("src/models").forEach((f) => {
      const Models = require(`../models/${f}`);
      let models = new Models(knex);
      models.run();
    });
    let psport = require("./Strategy.js");
    new psport(knex).run();

    // Register all routes
    fs.readdirSync("src/routes").forEach((f) => {
      const Routes = require(`../routes/${f}`);
      let routes = new Routes(knex);
      this.app.use(`/${routes.opt.name}`, routes.run());
    });

    (async () => {
      // Get single data
      console.log(JSON.parse(JSON.stringify(await knex("pelanggaran_siswa").select("nama_pelanggaran").where({ nis: 12345 }).first())));
      // Get all data
      console.log(JSON.parse(JSON.stringify(await knex("pelanggaran_siswa").select("nama_pelanggaran").where({ nis: 12345 }))));
    })();
  }
}

module.exports = Server;
