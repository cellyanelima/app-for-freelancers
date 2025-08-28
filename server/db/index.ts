import { Profession } from '../../models/Profession.ts'
import {
  Opportunity,
  OpportunityData,
  OpportunityWithProfession,
} from '../../models/Opportunity.ts'
import { Freelancer } from '../../models/Freelancer.ts'
import knexFile from './knexfile.js'
import knex from 'knex'
import { Ta } from '../../models/Territorial_authorities.ts'

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
    'mobile',
    'email',
    'description',
    'hours',
    'territorial_authority_id as territorialAuthorityId',
    'locality_id as localityId',
    'legacy_city as legacyCity',
    'legacy_suburb as legacySuburb',
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
    'legacy_city as legacyCity',
    'legacy_suburb as legacySuburb',
  )
  return freelancers as Freelancer[]
}

export async function getAllCities(): Promise<Ta[]> {
  const territorial_authorities = await connection(
    'territorial_authorities',
  ).select(
    'id',
    'name',
    'short_name as shortName',
    'category',
    'region_id as regionId',
  )
  return territorial_authorities as Ta[]
}

export async function getOpportunitiesByCity(
  city: string,
): Promise<OpportunityWithProfession[]> {
  const cityParam = city ?? ''
  const asNumber = Number(cityParam)
  const baseQuery = connection('opportunities')
    .join('professions', 'opportunities.profession_id', 'professions.id')
    .select(
      'opportunities.id',
      'professions.name as professionName',
      'opportunities.name',
      'opportunities.description',
      'opportunities.hours',
      'opportunities.mobile',
      'opportunities.email',
      'territorial_authority_id as territorialAuthorityId',
      'locality_id as localityId',
      'legacy_city as legacyCity',
      'legacy_suburb as legacySuburb',
    )
    .orderBy('opportunities.id', 'desc')

  if (Number.isFinite(asNumber) && cityParam.trim() !== '') {
    const byId = await baseQuery
      .clone()
      .where('opportunities.territorial_authority_id', asNumber)
    if (byId.length > 0) return byId as OpportunityWithProfession[]
  }

  const ta = await connection('territorial_authorities')
    .select('id')
    .whereRaw('LOWER(name) = LOWER(?)', [cityParam])
    .orWhereRaw('LOWER(name) LIKE LOWER(?)', [`%${cityParam}%`])
    .first()

  if (ta?.id) {
    const byTa = await baseQuery
      .clone()
      .where('opportunities.territorial_authority_id', ta.id)
    return byTa as OpportunityWithProfession[]
  }

  return []
}

export async function getOpportunitieById(id: number): Promise<Opportunity> {
  const opportunity = await connection('opportunities')
    .where({ id })
    .select(
      'id',
      'profession_id as professionId',
      'name',
      'mobile',
      'email',
      'description',
      'hours',
      'territorial_authority_id as territorialAuthorityId',
      'locality_id as localityId',
      'legacy_city as legacyCity',
      'legacy_suburb as legacySuburb',
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
    mobile,
    email,
    description,
    hours,
    territorialAuthorityId,
    localityId,
    legacyCity,
    legacySuburb,
  } = opportunity

  const newOpportunity = {
    profession_id: professionId,
    name,
    mobile,
    email,
    description,
    hours,
    territorial_authority_id: territorialAuthorityId,
    locality_id: localityId,
    legacy_city: legacyCity,
    legacy_suburb: legacySuburb,
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
    mobile,
    email,
    description,
    hours,
    territorialAuthorityId,
    localityId,
    legacyCity,
    legacySuburb,
  } = updatedOpportunity

  await connection('opportunities')
    .where({ id })
    .update({
      profession_id: Number(professionId),
      name,
      mobile,
      email,
      description,
      hours,
      territorial_authority_id: territorialAuthorityId,
      locality_id: localityId,
      legacy_city: legacyCity,
      legacy_suburb: legacySuburb,
    })
}
