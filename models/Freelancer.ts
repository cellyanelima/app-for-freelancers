export interface FreelancerData {
  professionId: number
  name: string
  experience: string
  availability: string
  mobile: string
  email: string
}

export interface FreelancerWithProfission {
  id: number
  freelancerName: string
  experience: string
  availability: string
  mobile: string
  email: string
}

export interface Freelancer extends FreelancerData {
  id: number
}
