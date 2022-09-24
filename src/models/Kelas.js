const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class Kelas extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("kelas").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("kelas", (tb) => {
            tb.increments("id", { primaryKey: true }).unsigned().unique();
            tb.integer("kelas");
            tb.string("jurusan", 255);
            tb.integer("ruang");
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("kelas").insert({ kelas: 12, jurusan: "MM", ruang: 1 });
          });
      }
    });
  }
}

module.exports = Kelas;
