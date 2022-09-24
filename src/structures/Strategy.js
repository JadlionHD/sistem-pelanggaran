const { Knex } = require("knex");
const passport = require("passport");
const LocalPassport = require("passport-local").Strategy;

class LocalAuth {
  /**
   *
   * @param {Knex} knex
   */
  constructor(knex) {
    if (!knex) throw new Error("Database needed");
    this.knex = knex;
  }

  /**
   * @param {string} tableName
   * @param {Knex.Raw<any, any>} opt
   * @returns {Promise<Knex.Raw<any, any>>}
   */
  async findOne(tableName, opt) {
    return JSON.parse(JSON.stringify(await this.knex(tableName).select().where(opt).first()));
  }

  run() {
    passport.serializeUser((user, done) => {
      done(null, {
        id: user.id,
        username: user.username,
        nis: user.nis ? user.nis : null,
        nip: user.nip ? user.nip : null,
        kelas_id: user.kelas_id ? user.kelas_id : null,
        level: user.level ? user.level : null
      });
    });
    passport.deserializeUser(async (user, done) => {
      try {
        let data = null;
        if (user.level === 0 || user.level === 3 || user.level === 5) {
          data = await this.findOne("user", {
            id: user.id,
            level: user.level >= 6 ? null : user.level
          });
        } else if (user.level === 1 || user.level === 2) {
        } else if (user.level === 4) {
          data = await this.findOne("user_siswa", {
            nis: user.nis
          });
        } else {
          throw "Invalid level";
        }

        if (data !== null) {
          done(null, {
            id: data.id,
            username: data.username,
            nis: user.nis ? user.nis : null,
            nip: user.nip ? user.nip : null,
            nama_lengkap: data.nama_lengkap,
            kelas_id: user.kelas_id ? user.kelas_id : null,
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
            console.log(req.body);
            let body = req.body;
            if (!body.username && !body.password && !body.sebagai) return;

            let data = null;
            let level = isNaN(body.sebagai) ? null : parseInt(body.sebagai);

            if (body.sebagai === "5") {
              data = await this.findOne("user", {
                username: body.username,
                pass: body.password,
                level: level >= 6 ? null : level
              });
            } else if (body.sebagai === "4") {
              data = await this.findOne("user_siswa", {
                nis: body.username,
                tgl_lahir: body.password
              });
            }
            if (data !== null) {
              return done(null, data);
            } else {
              throw "No data found";
            }
          } catch (err) {
            console.log(err);
            return done(err, null);
          }
        }
      )
    );
  }
}

module.exports = LocalAuth;
