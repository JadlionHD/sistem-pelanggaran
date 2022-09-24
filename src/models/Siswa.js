const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class Siswa extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("user_siswa").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("user_siswa", (tb) => {
            tb.integer("nis").unsigned().unique().primary();
            tb.string("nama_lengkap", 255).notNullable();
            tb.date("tgl_lahir").notNullable();
            tb.integer("kelas_id").unsigned().nullable().references("kelas.id");
            tb.integer("level").notNullable();
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("user_siswa").insert({ nis: 12345, nama_lengkap: "Pesulap Merah", tgl_lahir: "2000-01-01", kelas_id: 1, level: 4 });
          });
      }
    });
  }
}

module.exports = Siswa;
