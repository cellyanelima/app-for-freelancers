// src/hooks/use-city-opportunity.ts
import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { OpportunityWithProfession } from '../../models/Opportunity'

export default function useCityOpportunity(city?: string) {
  return useQuery({
    queryKey: ['cities', city ?? ''],
    enabled: !!city,
    queryFn: async () => {
      const res = await request.get(`/api/v1/cities/${city}`)
      return res.body as { opportunities: OpportunityWithProfession[] }
    },
  })
}

/*import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { OpportunityWithProfession } from '../../models/Opportunity'

export default function useCityOpportunity(city: string) {
  return useQuery({
    queryFn: async () => {
      const res = await request.get(`/api/v1/cities/${city}`)
      return res.body as { opportunities: OpportunityWithProfession[] }
    },

    queryKey: ['cities', city],
  })
}
*/
