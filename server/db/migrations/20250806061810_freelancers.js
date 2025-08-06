/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('freelancers', (table) => {
    table.increments('id').primary()
    table.integer('profession_id').references('professions.id')
    table.string('name')
    table.string('experience')
    table.string('availability')
    table.string('mobile')
    table.string('email')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('freelancers')
}
