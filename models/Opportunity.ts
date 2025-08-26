export interface OpportunityData {
  professionId: number
  name: string
  mobile: string
  email: string
  description: string
  hours: string
  territorialAuthorityId: number
  localityId: number
  legacyCity: string
  legacySuburb: string
}

export interface OpportunityWithProfession {
  id: number
  professionName: string
  name: string
  description: string
  hours: string
  mobile: string
  email: string
  territorialAuthorityId: number
  localityId: number
  legacyCity: string
  legacySuburb: string
}

export interface Opportunity extends OpportunityData {
  id: number
}
