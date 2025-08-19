/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('professions').del()

  await knex('professions').insert([
    { id: 1, name: 'Software Developer', description: 'Web, mobile e backend' },
    { id: 2, name: 'Plumber', description: 'Serviços hidráulicos' },
    { id: 3, name: 'Gardener', description: 'Jardinagem e paisagismo' },
  ])
}
