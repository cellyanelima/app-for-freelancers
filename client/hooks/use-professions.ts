// src/hooks/useProfessions.ts
import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import type { Profession } from '../../models/Profession'

export default function useProfessions() {
  return useQuery({
    queryKey: ['profession'],
    queryFn: async () => {
      const res = await request.get('/api/v1/professions')
      if (res.ok) return res.body as { professions: Profession[] }
      throw new Error(res.text)
    },
  })
}
