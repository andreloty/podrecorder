// eslint-disable-next-line no-unused-vars
const Knex = require('knex')

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema.createTable('user', (table) => {
    table.increments('id')

    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('email', 255).notNullable().unique()
    table.string('password', 255).notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('user')
}
