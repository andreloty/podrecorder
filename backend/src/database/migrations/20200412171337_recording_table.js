// eslint-disable-next-line no-unused-vars
const Knex = require('knex')

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema.createTable('recording', (table) => {
    table.increments('id')

    table.string('email', 255).notNullable()
    table.uuid('session').notNullable()
    table.string('code', 6).notNullable()
    table.boolean('is_active').notNullable()
    table.boolean('is_recording').notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('recording')
}
