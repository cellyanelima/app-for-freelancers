/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('opportunities').del()

  await knex('opportunities').insert([
    {
      id: 1,
      name: 'React contractor for startup',
      description: 'Projeto React/Node de 3 meses',
      hours: '20h/semana',
      mobile: '0222222222',
      email: 'founder@startup.nz',
      profession_id: 1, // Software Developer
      territorial_authority_id: 1, // Auckland
      locality_id: 1, // Ponsonby
      legacy_city: 'Auckland',
      legacy_suburb: 'Ponsonby',
    },
    {
      id: 2,
      name: 'Electrical fit-out - retail',
      description: 'Instalação elétrica em loja do CBD',
      hours: 'casual',
      mobile: '0233333333',
      email: 'ops@retail.nz',
      profession_id: 2, // Plumber (só exemplo, troque depois para Electrician se criar)
      territorial_authority_id: 2, // Wellington City
      locality_id: 2, // Te Aro
      legacy_city: 'Wellington City',
      legacy_suburb: 'Te Aro',
    },
  ])
}
