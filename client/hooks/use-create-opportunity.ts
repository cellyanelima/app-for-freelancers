// src/hooks/use-create-opportunity.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import type { OpportunityData } from '../../models/Opportunity'

export default function useCreateOpportunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: OpportunityData) => {
      await request.post('/api/v1/opportunities').send(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['opportunities'],
        exact: false,
      })
      queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })
      alert('Opportunity successfully created!')
    },
  })
}
