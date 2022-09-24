const { Knex } = require("knex");
const IModel = require("../abstracts/IModel");

class NamaPelanggaran extends IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    super();
    this.knex = knex;
  }
  async run() {
    this.knex.schema.hasTable("nama_pelanggaran").then((exist) => {
      if (!exist) {
        this.knex.schema
          .createTable("nama_pelanggaran", (tb) => {
            tb.increments("id", { primaryKey: true }).unsigned().unique();
            tb.string("nama", 255);
            tb.integer("point");
            tb.timestamps(true, true, true);
          })
          .then(async () => {
            await this.knex("nama_pelanggaran").insert([
              { nama: "Bolos", point: 50 },
              { nama: "Telat", point: 10 }
            ]);
          });
      }
    });
  }
}

module.exports = NamaPelanggaran;
