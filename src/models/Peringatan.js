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
      "status_peringatan",
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
        dari_guru: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          references: {
            model: "user_guru",
            key: "id"
          }
        },
        pesan: {
          type: DataTypes.STRING,
          values: 255
        }
      },
      { tableName: "status_peringatan" }
    );
  }
}

module.exports = Pelanggaran;
