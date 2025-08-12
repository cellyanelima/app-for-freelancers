import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { OpportunityWithProfession } from '../../models/Opportunity'

export default function useCity(city: string) {
  return useQuery({
    queryFn: async () => {
      const res = await request.get(`/api/v1/cities/${city}`)
      return res.body as { opportunities: OpportunityWithProfession[] }
    },

    queryKey: ['cities', city],
  })
}
