const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class User extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("user").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("user", (tb) => {
            tb.increments("id", { primaryKey: true });

            tb.string("username", 255).notNullable();
            tb.string("nama_lengkap", 255).notNullable();
            tb.string("pass", 255).notNullable();
            tb.integer("level").notNullable();
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("user").insert({ username: "admin", nama_lengkap: "Pesulap Merah", pass: "123", level: 5 });
          });
      }
    });
  }
}

module.exports = User;
