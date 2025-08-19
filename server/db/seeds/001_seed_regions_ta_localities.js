/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Limpa tabelas dependentes primeiro
  await knex('localities').del()
  await knex('territorial_authorities').del()
  await knex('regions').del()

  // REGIÕES
  await knex('regions').insert([
    { id: 1, name_en: 'Auckland', name_mi: 'Tāmaki Makaurau', type: 'unitary' },
    {
      id: 2,
      name_en: 'Wellington',
      name_mi: 'Te Whanganui-a-Tara',
      type: 'region',
    },
    { id: 3, name_en: 'Canterbury', name_mi: 'Waitaha', type: 'region' },
  ])

  // TERRITORIAL AUTHORITIES
  await knex('territorial_authorities').insert([
    {
      id: 1,
      name: 'Auckland Council',
      short_name: 'Auckland',
      category: 'unitary',
      region_id: 1,
    },
    {
      id: 2,
      name: 'Wellington City Council',
      short_name: 'Wellington City',
      category: 'city',
      region_id: 2,
    },
    {
      id: 3,
      name: 'Christchurch City Council',
      short_name: 'Christchurch City',
      category: 'city',
      region_id: 3,
    },
  ])

  // LOCALITIES
  await knex('localities').insert([
    {
      id: 1,
      name: 'Ponsonby',
      territorial_authority_id: 1,
      lat: -36.855,
      lng: 174.744,
    },
    {
      id: 2,
      name: 'Te Aro',
      territorial_authority_id: 2,
      lat: -41.2924,
      lng: 174.777,
    },
    {
      id: 3,
      name: 'Riccarton',
      territorial_authority_id: 3,
      lat: -43.5298,
      lng: 172.5821,
    },
  ])
}
