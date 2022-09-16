const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class Siswa extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "user_siswa",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        nis: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          allowNull: true
        },
        tgl_lahir: {
          type: DataTypes.DATE,
          allowNull: false
        },
        kelas_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          unique: true,
          references: {
            model: "kelas",
            key: "id"
          },
          allowNull: true
        }
      },
      { tableName: "user_siswa" }
    );
  }
}

module.exports = Siswa;
