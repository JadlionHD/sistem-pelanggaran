const { Router } = require("express");
const { Knex } = require("knex");
const { RowDataPacket } = require("mysql2");

class IRoute {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    this.opt = { name: "" };
    this.knex = knex;
    this.router = Router();
  }

  /**
   * @param {string} tableName
   * @param {Knex.Raw<any, any>} opt
   * @returns {Promise<Knex.Raw<any, any>>}
   */
  async findOne(tableName, opt) {
    return await this.toJSON(this.knex(tableName).select().where(opt).first());
  }

  /**
   *
   * @param {RowDataPacket} raw
   * @returns {Object}
   */
  toJSON(raw) {
    return JSON.parse(JSON.stringify(raw));
  }

  /**
   * @returns {Router}
   */
  run() {}
}

module.exports = IRoute;
