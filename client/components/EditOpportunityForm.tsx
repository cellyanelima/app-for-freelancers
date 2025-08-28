import { useState, FormEvent, ChangeEvent } from 'react'
import LoadingIndicator from './LoadingIndicator'
import useProfessions from '../hooks/use-professions'
import useCities from '../hooks/use-cities'
import type { Opportunity } from '../../models/Opportunity'

interface Props extends Opportunity {
  submitLabel: string
  onSubmit: (op: Opportunity) => void
}

export default function EditOpportunityForm(props: Props) {
  const { submitLabel, onSubmit, ...initial } = props

  const professions = useProfessions()
  const cities = useCities()

  const [formState, setFormState] = useState<Opportunity>({ ...initial })

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      // converte para número quando necessário
      [name]:
        name === 'professionId' ||
        name === 'territorialAuthorityId' ||
        name === 'localityId'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formState)
  }

  if (professions.isPending || cities.isPending) return <LoadingIndicator />
  if (professions.isError || !professions.data)
    return <>Failed to load professions</>
  if (cities.isError || !cities.data) return <>Failed to load cities</>

  const taList = cities.data.cities

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

      <label htmlFor="territorialAuthorityId" className="label">
        City
      </label>
      <select
        id="territorialAuthorityId"
        name="territorialAuthorityId"
        value={formState.territorialAuthorityId}
        onChange={handleChange}
      >
        {taList.map((ta) => (
          <option key={ta.id} value={ta.id}>
            {ta.shortName}
          </option>
        ))}
      </select>

      <label htmlFor="legacySuburb" className="label">
        Suburb
      </label>
      <input
        type="text"
        id="legacySuburb"
        name="legacySuburb"
        placeholder="e.g., Mount Eden"
        onChange={handleChange}
        value={formState.legacySuburb}
      />

      <label htmlFor="hours" className="label">
        Hours
      </label>
      <input
        type="text"
        id="hours"
        name="hours"
        onChange={handleChange}
        placeholder="Example: 1h"
        value={formState.hours}
      />

      <label htmlFor="mobile" className="label">
        Mobile
      </label>
      <input
        type="tel"
        id="mobile"
        name="mobile"
        onChange={handleChange}
        placeholder="+64 …"
        value={formState.mobile}
      />

      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        placeholder="name@example.com"
        value={formState.email}
      />

      <button className="form">{submitLabel}</button>
    </form>
  )
}
