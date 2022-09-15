const passport = require("passport");
const { Sequelize, Model, ModelCtor } = require("sequelize");
const LocalPassport = require("passport-local").Strategy;

class LocalAuth {
  /**
   *
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    if (!sequelize) throw new Error("Database needed");
    this.sequelize = sequelize;
  }

  /**
   * @param {string} modelName
   * @param {Model<any, any>} opt
   * @returns {Promise<Model<any, any>>}
   */
  async findOne(modelName, opt) {
    return await this.sequelize.models[modelName].findOne(opt);
  }

  run() {
    passport.serializeUser((user, done) => {
      done(null, {
        id: user.id,
        level: user.level
      });
    });
    passport.deserializeUser(async (user, done) => {
      try {
        let data = null;
        if (user.level === 0 || user.level === 3 || user.level === 5) {
          data = await this.findOne("user", {
            where: {
              id: user.id,
              level: user.level >= 6 ? null : user.level
            }
          });
        } else if (user.level === 1 || user.level === 2) {
        } else if (user.level === 4) {
        } else {
          throw "Invalid level";
        }

        if (data !== null) {
          done(null, {
            id: data.id,
            username: data.username,
            nama_lengkap: data.nama_lengkap,
            level: data.level
          });
        } else {
          throw "No data found";
        }
      } catch (err) {
        done(err, null);
      }
    });

    passport.use(
      new LocalPassport(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true
        },
        async (req, username, password, done) => {
          try {
            let body = req.body;
            if (!body.username && !body.password && !body.sebagai) return;

            let data = null;
            if (body.sebagai === "5") {
              let level = isNaN(body.sebagai) ? null : parseInt(body.sebagai);

              data = await this.findOne("user", {
                where: {
                  username: body.username,
                  pass: body.password,
                  level: level >= 6 ? null : level
                }
              });
            }
            if (data !== null) {
              return done(null, data);
            } else {
              throw "No data found";
            }
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
  }
}

module.exports = LocalAuth;
