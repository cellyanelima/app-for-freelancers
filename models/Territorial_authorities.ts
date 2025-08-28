export interface TaData {
  name: string
  shortName: string
  category: string
  regionId: number
}

export interface Ta extends TaData {
  id: number
}
