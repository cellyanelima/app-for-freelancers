import { Profession } from '../../models/Profession.ts'
import {
  Opportunity,
  OpportunityData,
  OpportunityWithProfession,
} from '../../models/Opportunity.ts'
import { Freelancer } from '../../models/Freelancer.ts'
import knexFile from './knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllProfessions(): Promise<Profession[]> {
  const professions = await connection('professions').select('*')
  return professions as Profession[]
}

export async function getAllOpportunities(): Promise<Opportunity[]> {
  const opportunities = await connection('opportunities').select(
    'id',
    'profession_id as professionId',
    'name',
    'suburb',
    'city',
    'mobile',
    'email',
    'description',
    'hours',
  )
  return opportunities as Opportunity[]
}

export async function getAllFreelancers(): Promise<Freelancer[]> {
  const freelancers = await connection('freelancers').select(
    'id',
    'profession_id as professionId',
    'name',
    'experience',
    'availability',
    'mobile',
    'email',
  )
  return freelancers as Freelancer[]
}

export async function getOpportunitiesByCity(
  city: string,
): Promise<OpportunityWithProfession[]> {
  const opportunities = await connection('opportunities')
    .join('professions', 'opportunities.profession_id', 'professions.id')
    .where('opportunities.city', city)
    .select(
      'opportunities.id',
      'professions.name as professionName',
      'opportunities.suburb',
      'opportunities.city',
      'opportunities.mobile',
      'opportunities.email',
      'opportunities.description',
      'opportunities.hours',
    )

  return opportunities as OpportunityWithProfession[]
}

export async function getOpportunitieById(id: number): Promise<Opportunity> {
  const opportunity = await connection('opportunities')
    .where({ id })
    .select(
      'id',
      'profession_id as professionId',
      'name',
      'suburb',
      'city',
      'mobile',
      'email',
      'description',
      'hours',
    )
    .first()
  return opportunity as Opportunity
}

export async function addNewOpportunity(
  opportunity: OpportunityData,
): Promise<number> {
  const {
    professionId,
    name,
    suburb,
    city,
    mobile,
    email,
    description,
    hours,
  } = opportunity

  const newOpportunity = {
    profession_id: professionId,
    name,
    suburb,
    city,
    mobile,
    email,
    description,
    hours,
  }

  //console.log('Inserting opportunity with:', newOpportunity)

  return await connection('opportunities').insert(newOpportunity)
}

export async function deleteOpportunity(id: number): Promise<void> {
  await connection('opportunities').where({ id }).delete()
}

export async function updateOpportunity(
  updatedOpportunity: Opportunity,
): Promise<void> {
  const {
    id,
    professionId,
    name,
    suburb,
    city,
    mobile,
    email,
    description,
    hours,
  } = updatedOpportunity

  await connection('opportunities')
    .where({ id })
    .update({
      profession_id: Number(professionId),
      name,
      suburb,
      city: city?.toLowerCase(),
      mobile,
      email,
      description,
      hours: Number(hours),
    })
}
