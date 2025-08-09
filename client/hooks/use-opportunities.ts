import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import type { Opportunity } from '../../models/Opportunity.ts'

export default function useOpportunities() {
  return useQuery({
    queryKey: ['opportunity'],
    queryFn: async () => {
      const res = await request.get('/api/v1/opportunities')
      if (res.ok) {
        return res.body as { opportunities: Opportunity[] }
      }

      throw new Error(res.text)
    },
  })
}
