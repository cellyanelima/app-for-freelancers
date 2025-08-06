/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('freelancers').del()
  await knex('freelancers').insert([
    {
      id: 1,
      profession_id: 1,
      name: 'Cloe Xin',
      experience: '2 years',
      availability: 'Weekday',
      mobile: '21963741',
      email: 'cloexin123@gmail.com',
    },
    {
      id: 2,
      profession_id: 2,
      name: 'Arthur Viana',
      experience: '1 years',
      availability: 'Weekend',
      mobile: '27852963',
      email: 'arthur123@gmail.com',
    },
    {
      id: 3,
      profession_id: 3,
      name: 'Alex Miller',
      experience: '2 years',
      availability: 'Weekend',
      mobile: '21123456',
      email: 'alex123@gmail.com',
    },
  ])
}
