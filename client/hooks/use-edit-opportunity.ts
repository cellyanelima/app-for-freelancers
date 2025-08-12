import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import type { Opportunity } from '../../models/Opportunity'

export default function useEditOpportunity(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: Opportunity) => {
      await request.put(`/api/v1/opportunities/${id}`).send(values)
    },
    onSuccess: () => {
      alert('Opportunity successfully updated!')

      queryClient.invalidateQueries({ queryKey: ['opportunity', id] })
      queryClient.invalidateQueries({
        queryKey: ['opportunities'],
        exact: false,
      })
      queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })
    },
  })
}
