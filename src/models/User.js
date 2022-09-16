const { Sequelize, DataTypes } = require("sequelize");
const IModel = require("../abstracts/IModel");

class User extends IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }
  run() {
    this.sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
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
        pass: {
          type: DataTypes.STRING,
          values: 255,
          allowNull: false
        },
        level: {
          type: DataTypes.INTEGER,
          values: 11,
          allowNull: false
        }
      },
      { tableName: "user" }
    );
  }
}

module.exports = User;
