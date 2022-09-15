const { Sequelize, DataTypes } = require("sequelize");

class IModel {
  /**
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  run() {}
}

module.exports = IModel;
