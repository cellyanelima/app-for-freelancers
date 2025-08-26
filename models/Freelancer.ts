export interface FreelancerData {
  professionId: number
  name: string
  experience: string
  availability: string
  mobile: string
  email: string
  legacyCity: string
  legacySuburb: string
}

export interface FreelancerWithProfission {
  id: number
  freelancerName: string
  professionName: string
  experience: string
  availability: string
  mobile: string
  email: string
  legacyCity: string
  legacySuburb: string
}

export interface Freelancer extends FreelancerData {
  id: number
}
