const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class Guru extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "user_guru",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          unique: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          values: 255,
          allowNull: false
        },
        nama_lengkap: {
          type: DataTypes.STRING,
          values: 255,
          allowNull: false
        },
        nip: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true
        },
        pass: {
          type: DataTypes.STRING,
          values: 255,
          allowNull: false
        },
        level: {
          type: DataTypes.INTEGER,
          values: 11,
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
      { tableName: "user_guru" }
    );
  }
}

module.exports = Guru;
