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
    this.knex.schema.hasTable("status_peringatan").then(async (exist) => {
      if (!exist) {
        this.knex.schema.createTable("status_peringatan", (tb) => {
          tb.increments("id", { primaryKey: true }).unsigned();
          tb.integer("nis").unsigned().references("user_siswa.nis");
          tb.integer("dari_guru").unsigned().references("user_guru.id");
          tb.string("pesan", 255);
          tb.timestamps(true, true, true);
        });
      }
    });
  }
}

module.exports = Pelanggaran;
