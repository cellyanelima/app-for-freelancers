export const validNzCities = [
  'auckland',
  'wellington',
  'christchurch',
  'hamilton',
  'dunedin',
  'tauranga',
  'napier',
]

export function validateCity(
  city: string | undefined,
  cities: string[] = validNzCities,
): string {
  if (typeof city !== 'string') return cities[0]
  const cityLower = city.toLowerCase()
  if (!cities.includes(cityLower)) return cities[0]
  return cityLower
}
