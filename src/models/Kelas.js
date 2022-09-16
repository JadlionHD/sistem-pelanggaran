const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class Kelas extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "kelas",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          unique: true,
          primaryKey: true
        },
        kelas: {
          type: DataTypes.INTEGER,
          values: 20
        },
        jurusan: {
          type: DataTypes.STRING,
          values: 255
        },
        ruang: {
          type: DataTypes.STRING,
          values: 255
        }
      },
      { tableName: "kelas" }
    );
  }
}

module.exports = Kelas;
