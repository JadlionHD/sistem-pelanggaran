const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class NamaPelanggaran extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "nama_pelanggaran",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          unique: true,
          primaryKey: true
        },
        nama: {
          type: DataTypes.STRING,
          values: 255
        }
      },
      { tableName: "nama_pelanggaran" }
    );
  }
}

module.exports = NamaPelanggaran;
