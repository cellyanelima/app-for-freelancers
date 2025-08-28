import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import { Ta } from '../../models/Territorial_authorities.ts'

export default function useCities() {
  return useQuery({
    queryKey: ['territorial'],
    queryFn: async () => {
      const res = await request.get('/api/v1/cities')
      if (res.ok) return res.body as { cities: Ta[] }
      throw new Error(res.text)
    },
  })
}
