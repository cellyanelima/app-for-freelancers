/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('freelancers').del()

  await knex('freelancers').insert([
    {
      id: 1,
      name: 'Cloe Xin',
      experience: '2 years',
      availability: 'Weekday',
      mobile: '21963741',
      email: 'cloexin123@gmail.com',
      profession_id: 1, // Software Developer
      territorial_authority_id: 1, // Auckland
      locality_id: 1, // Ponsonby
      legacy_city: 'Auckland',
      legacy_suburb: 'Ponsonby',
    },
    {
      id: 2,
      name: 'Arthur Viana',
      experience: '1 year',
      availability: 'Weekend',
      mobile: '27852963',
      email: 'arthur123@gmail.com',
      profession_id: 2, // Plumber
      territorial_authority_id: 2, // Wellington City
      locality_id: 2, // Te Aro
      legacy_city: 'Wellington City',
      legacy_suburb: 'Te Aro',
    },
    {
      id: 3,
      name: 'Alex Miller',
      experience: '2 years',
      availability: 'Weekend',
      mobile: '21123456',
      email: 'alex123@gmail.com',
      profession_id: 3, // Gardener
      territorial_authority_id: 1, // Auckland
      locality_id: 1, // Ponsonby
      legacy_city: 'Auckland',
      legacy_suburb: 'Ponsonby',
    },
  ])
}
