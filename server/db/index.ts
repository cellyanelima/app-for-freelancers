import { Profession } from '../../models/Profession.ts'
import {
  Opportunity,
  OpportunityWithProfission,
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
  const opportunities = await connection('opportunities').select('*')
  return opportunities as Opportunity[]
}

export async function getAllFreelancers(): Promise<Freelancer[]> {
  const freelancers = await connection('freelancers').select('*')
  return freelancers as Freelancer[]
}

export async function getOpportunitiesByCity(
  city: string,
): Promise<OpportunityWithProfission[]> {
  const opportunities = await connection('opportunities')
    .join('professions', 'opportunities.profession_id', 'professions.id')
    .where('opportunities.city', city)
    .select(
      'opportunities.id',
      'professions.name as professionName',
      'opportunities.name as opportunitiesName',
      'opportunities.suburb',
      'opportunities.city',
      'opportunities.mobile',
      'opportunities.email',
      'opportunities.description',
      'opportunities.hours',
    )

  return opportunities as OpportunityWithProfission[]
}
