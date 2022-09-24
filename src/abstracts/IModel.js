const { Knex } = require("knex");

class IModel {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    this.knex = knex;
  }

  run() {}
}

module.exports = IModel;
