const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class Pelanggaran extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("pelanggaran_siswa").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("pelanggaran_siswa", (tb) => {
            tb.increments("id", { primaryKey: true }).unsigned();
            tb.integer("nis").unsigned().notNullable().references("user_siswa.nis");
            tb.integer("nama_pelanggaran").unsigned().references("nama_pelanggaran.id");
            tb.integer("dari_guru").unsigned().references("user_guru.id");
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("pelanggaran_siswa").insert([
              { nis: 12345, nama_pelanggaran: 1, dari_guru: 1 },
              { nis: 12345, nama_pelanggaran: 2, dari_guru: 1 }
            ]);
          });
      }
    });
  }
}

module.exports = Pelanggaran;
