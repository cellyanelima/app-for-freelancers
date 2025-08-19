/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('freelancers', (table) => {
    table.increments('id').primary()

    table
      .integer('profession_id')
      .references('id')
      .inTable('professions')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
      .index()

    table
      .integer('territorial_authority_id')
      .references('id')
      .inTable('territorial_authorities')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
      .index()

    table
      .integer('locality_id')
      .references('id')
      .inTable('localities')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
      .index()

    table.string('name')
    table.string('experience')
    table.string('availability')
    table.string('mobile')
    table.string('email')

    table.string('legacy_city')
    table.string('legacy_suburb')

    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('freelancers')
}
