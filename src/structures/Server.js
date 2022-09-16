const fs = require("fs");
const { Sequelize, DataTypes } = require("sequelize");
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
      if (req.user) return res.redirect("../../dashboard");
      console.log("ROOT", req.user);
      res.render("login.ejs");
    });

    this.app.use("/api", require("../routes/api.js"));
    this.app.use("/auth", require("../routes/auth.js"));
    this.app.use("/dashboard", require("../routes/dashboard.js"));

    this.app.listen(process.env.EXPRESS_PORT || 3000, () => {
      console.log("Ready");
    });
  }

  setModels() {
    const sequelize = new Sequelize({
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB_NAME,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASS,
      port: parseInt(process.env.MYSQL_PORT),
      logging: false
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log("Sucessfully connected");
        // this.sequelize = sequelize;
        let psport = require("./Strategy.js");
        new psport(sequelize).run();
        fs.readdirSync("src/models").forEach((f) => {
          const Models = require(`../models/${f}`);
          let models = new Models(sequelize);
          models.run();
        });
      })
      .catch((r) => {
        console.log("Failed", r.message);
      });
  }
}

module.exports = Server;
