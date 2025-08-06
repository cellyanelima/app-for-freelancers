/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('opportunities', (table) => {
    table.increments('id').primary()
    table.integer('profession_id').references('professions.id')
    table.string('name')
    table.string('suburb')
    table.string('city')
    table.string('mobile')
    table.string('email')
    table.string('description')
    table.string('hours')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('opportunities')
}
