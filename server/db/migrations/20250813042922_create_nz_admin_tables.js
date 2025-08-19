/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<knex.SchemaBuilder> }
 */

export async function up(knex) {
  // REGIONS
  await knex.schema.createTable('regions', (table) => {
    table.increments('id').primary()
    table.string('name_en').notNullable().unique()
    table.string('name_mi')
    table.string('type').notNullable().defaultTo('region') // 'region' | 'unitary'
    table.timestamps(true, true)
  })

  // TERRITORIAL AUTHORITIES (City/District/Unitary councils)
  await knex.schema.createTable('territorial_authorities', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique() // ex: "Wellington City Council"
    table.string('short_name').notNullable() // ex: "Wellington City", "Auckland"
    table.enu('category', ['city', 'district', 'unitary']).notNullable()
    table
      .integer('region_id')
      .references('id')
      .inTable('regions')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      .index()
    table.timestamps(true, true)
  })

  // LOCALITIES (suburbs/localities)
  await knex.schema.createTable('localities', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable() // ex: "Te Aro", "Ponsonby"
    table
      .integer('territorial_authority_id')
      .references('id')
      .inTable('territorial_authorities')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      .index()
    table.decimal('lat', 9, 6).nullable()
    table.decimal('lng', 9, 6).nullable()
    table.unique(['name', 'territorial_authority_id'])
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTableIfExists('localities')
  await knex.schema.dropTableIfExists('territorial_authorities')
  await knex.schema.dropTableIfExists('regions')
}
