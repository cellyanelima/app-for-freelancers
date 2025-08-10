import { useState, FormEvent, ChangeEvent } from 'react'
import { useProfessions } from '../hooks/api.ts'
import { OpportunityData } from '../../models/Opportunity.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

interface Props extends OpportunityData {
  submitLabel: string
  onSubmit: (_: OpportunityData) => void
}

export default function EditOpportunityForm(props: Props) {
  const { submitLabel, onSubmit, ...initial } = props
  const professions = useProfessions()

  const [formState, setFormState] = useState<OpportunityData>({
    ...initial,
  })

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'professionId' ? Number(value) : value,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formState)
  }

  if (professions.isPending) return <LoadingIndicator />
  if (professions.isError || !professions.data)
    return 'Failed to load professions'

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="name" className="label">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Opportunity name"
        onChange={handleChange}
        value={formState.name}
      />

      <label htmlFor="description" className="label">
        Description
      </label>
      <textarea
        rows={5}
        id="description"
        name="description"
        placeholder="Opportunity description"
        onChange={handleChange}
        value={formState.description}
      />

      <label htmlFor="professionId" className="label">
        Profession
      </label>
      <select
        id="professionId"
        name="professionId"
        value={formState.professionId}
        onChange={handleChange}
      >
        {professions.data.professions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="city" className="label">
        City
      </label>
      <select
        id="city"
        name="city"
        value={formState.city}
        onChange={handleChange}
      >
        {[
          'Auckland',
          'Wellington',
          'Christchurch',
          'Hamilton',
          'Dunedin',
          'Tauranga',
          'Napier',
        ].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="time"> Hours </label>
      <input
        type="text"
        id="hours"
        name="hours"
        onChange={handleChange}
        placeholder="Example: 1h"
        value={formState.hours}
      />

      <div></div>
      <button className="form">{submitLabel}</button>
    </form>
  )
}
