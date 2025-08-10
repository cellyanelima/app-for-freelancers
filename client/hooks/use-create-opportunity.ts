// src/hooks/use-create-opportunity.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import type { OpportunityData } from '../../models/Opportunity'

type CreatePayload = Omit<OpportunityData, 'professionId'> & {
  professionName: string
}

export default function useCreateOpportunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePayload) => {
      await request.post('/api/v1/opportunities').send(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['opportunities'],
        exact: false,
      })
      queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })
      alert('Oportunidade criada com sucesso!')
    },
  })
}
