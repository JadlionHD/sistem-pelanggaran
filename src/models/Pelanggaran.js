const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class Pelanggaran extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "pelanggaran_siswa",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        nis: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          references: {
            model: "user_siswa",
            key: "nis"
          }
        },
        nama_pelanggaran: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          references: {
            model: "nama_pelanggaran",
            key: "id"
          }
        },
        point_pelanggaran: {
          type: DataTypes.INTEGER
        },
        dari_guru: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          references: {
            model: "user_guru",
            key: "id"
          }
        }
      },
      { tableName: "pelanggaran_siswa" }
    );
  }
}

module.exports = Pelanggaran;
