import { useNavigate, useParams } from 'react-router-dom'
import { OpportunityData } from '../../models/Opportunity.ts'
import EditOpportunityForm from './EditOpportunityForm.tsx'
import LineupNav from './LineupNav.tsx'
import {
  useDeleteOpportunity,
  useEditOpportunity,
  useOpportunityData,
} from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function EditEvent() {
  const params = useParams()
  const id = Number(params.id)
  const opportunity = useOpportunityData(id)
  const editOpportunity = useEditOpportunity(id)
  const deleteOpportunity = useDeleteOpportunity(id)
  const navigate = useNavigate()

  if (opportunity.isPending) {
    return <LoadingIndicator />
  }

  if (opportunity.isError || !opportunity.data) {
    return 'Failed to load opportunity data'
  }

  if (opportunity.isPending) return <LoadingIndicator />
  if (opportunity.isError || !opportunity.data)
    return 'Failed to load opportunity data'

  const opp = opportunity.data

  const handleSubmit = async (formData: OpportunityData) => {
    await editOpportunity.mutateAsync(formData)
    navigate(`/cities/${formData.city}`)
  }

  const handleDelete = async (evt: React.FormEvent) => {
    evt.preventDefault()
    await deleteOpportunity.mutateAsync()
    navigate(`/cities/${opp.city}`)
  }

  return (
    <>
      <LineupNav />
      <h2>
        edit opportunity: <span className="data">{opp.city}</span>
      </h2>
      <EditOpportunityForm
        {...opp}
        submitLabel="Update opportunity"
        onSubmit={handleSubmit}
      />
      <form onSubmit={handleDelete} className="form">
        <div />
        <button className="delete">Delete opportunity</button>
      </form>
    </>
  )
}
