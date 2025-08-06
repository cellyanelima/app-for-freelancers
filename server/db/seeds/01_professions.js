/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('professions').del()
  await knex('professions').insert([
    {
      id: 1,
      name: 'Gardener',
      description:
        'A gardener is someone who cultivates and maintains plants, gardens, and outdoor spaces',
    },
    {
      id: 2,
      name: 'Dog Walking',
      description:
        'A dog walker provides exercise and care for dogs on behalf of their owners, typically by taking them on walks.',
    },
    {
      id: 3,
      name: 'Nanny',
      description:
        'A nanny is a professional caregiver who provides comprehensive care for children in a familys home',
    },
  ])
}
