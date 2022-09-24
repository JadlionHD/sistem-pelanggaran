const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class Guru extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("user_guru").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("user_guru", (tb) => {
            tb.increments("id", { primaryKey: true }).unsigned().unique();
            tb.string("username", 255).notNullable();
            tb.string("nama_lengkap", 255).notNullable();
            tb.integer("nip").unsigned().nullable();
            tb.string("pass", 255).notNullable();
            tb.integer("level").notNullable();
            tb.integer("kelas_id").unsigned().references("kelas.id");
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("user_guru").insert({ username: "gurubk", nama_lengkap: "Agus", nip: null, pass: "123", level: 2, kelas_id: 1 });
          });
      }
    });
  }
}

module.exports = Guru;
