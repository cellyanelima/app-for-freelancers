import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Opportunity } from '../../models/Opportunity.ts'

export default function useEditOpportunity(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: Opportunity) => {
      await request.put(`/api/v1/opportunities/${id}`).send(values)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['opportunity', id] })
      queryClient.invalidateQueries({ queryKey: ['city'] })
    },
  })
}
