// src/components/NewOpportunity.tsx
import { useNavigate } from 'react-router-dom'
import EditOpportunityForm from './EditOpportunityForm'
import type { OpportunityData } from '../../models/Opportunity'
import LineupNav from './LineupNav'
import useCreateOpportunity from '../hooks/use-create-opportunity'
import { useProfessions } from '../hooks/api'
import LoadingIndicator from './LoadingIndicator'
import { useSearchParams } from 'react-router-dom'

export default function NewOpportunity() {
  const createOpportunity = useCreateOpportunity()
  const navigate = useNavigate()
  const professions = useProfessions()
  const [params] = useSearchParams()
  const cityFromUrl = params.get('city') ?? 'auckland'

  if (professions.isPending) return <LoadingIndicator />
  if (professions.isError || !professions.data)
    return 'Failed to load professions'

  const list = professions.data.professions
  const defaultProfessionId = list[0]?.id ?? 1

  const handleSubmit = async (data: OpportunityData) => {
    const match = list.find(
      (p: { id: number; name: string }) => p.id === data.professionId,
    )
    const professionName = match?.name ?? ''

    await createOpportunity.mutateAsync({
      professionName,
      name: data.name,
      suburb: data.suburb,
      city: data.city,
      mobile: data.mobile,
      email: data.email,
      description: data.description,
      hours: data.hours,
    })
    navigate(`/cities/${data.city}`)
  }

  return (
    <>
      <LineupNav />
      <h2>New Opportunity</h2>
      <EditOpportunityForm
        submitLabel="Create opportunity"
        professionId={defaultProfessionId}
        name=""
        suburb=""
        city={cityFromUrl}
        mobile=""
        email=""
        description=""
        hours=""
        onSubmit={handleSubmit}
      />
    </>
  )
}
