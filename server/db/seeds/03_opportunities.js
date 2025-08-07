/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('opportunities').del()
  await knex('opportunities').insert([
    {
      id: 1,
      profession_id: 1,
      name: 'Philip Storn',
      suburb: 'Churton Park',
      city: 'wellington',
      mobile: '25852963',
      email: 'phil@gmail.com',
      description: 'I need to plant about 10 lily plants in my outdoor garden.',
      hours: 2,
    },
    {
      id: 2,
      profession_id: '1',
      name: 'Stuart Litlle',
      suburb: 'Tawa',
      city: 'wellington',
      mobile: '22963741',
      email: 'phil@gmail.com',
      description:
        'I need to plant about 10 sunflower seedlings in my outdoor garden.',
      hours: 2,
    },
    {
      id: 3,
      profession_id: '3',
      name: 'Steave Bee',
      suburb: 'Tuarth',
      city: 'wellington',
      mobile: '217416655',
      email: 'ste@gmail.com',
      description:
        'I have a 1 year old baby and I need a babysitter to spend 2 hours with him next Monday.',
      hours: 2,
    },
  ])
}
