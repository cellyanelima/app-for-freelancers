/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<knex.SchemaBuilder> }
 */

export async function up(knex) {
  await knex.schema.createTable('professions', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('description')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTableIfExists('professions')
}
