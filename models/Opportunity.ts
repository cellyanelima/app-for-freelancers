export interface OpportunityData {
  professionId: number
  name: string
  suburb: string
  city: string
  mobile: string
  email: string
  description: string
  hours: string
}

export interface OpportunityWithProfession {
  id: number
  professionName: string
  suburb: string
  city: string
  mobile: string
  email: string
  description: string
  hours: string
}

export interface Opportunity extends OpportunityData {
  id: number
}
