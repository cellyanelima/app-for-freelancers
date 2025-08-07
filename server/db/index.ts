import { Profession } from '../../models/Profession.ts'
import { Opportunity } from '../../models/Opportunity.ts'
import { Freelancer } from '../../models/Freelancer.ts'
import knexFile from './knexfile.js'
import knex from 'knex'

//import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

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
