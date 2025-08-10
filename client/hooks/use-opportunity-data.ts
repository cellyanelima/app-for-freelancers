import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Opportunity } from '../../models/Opportunity'

export default function useOpportunityData(id: number) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/opportunities/${id}`)
      return res.body as Opportunity
    },
  })
}
