// src/components/CityOpportunity.tsx
import { Link, useParams } from 'react-router-dom'
import LineupNav from './LineupNav'
import LoadingIndicator from './LoadingIndicator'
import useCityOpportunity from '../hooks/use-city-opportunity'

export default function CityOpportunity() {
  const { city } = useParams<{ city: string }>()
  const { data, isError, isPending, error } = useCityOpportunity(city)

  if (!city) {
    return (
      <>
        <LineupNav />
        <p className="error">City not informed on the route.</p>
      </>
    )
  }

  if (isPending) {
    return (
      <>
        <LineupNav />
        <LoadingIndicator />
      </>
    )
  }

  if (isError || !data) {
    return (
      <>
        <LineupNav />
        <p className="error">Failed to load: {String(error)}</p>
      </>
    )
  }

  const opportunities = data.opportunities ?? []

  return (
    <>
      <LineupNav />

      <h2>
        opportunities:&nbsp;<span className="data">{city}</span>
      </h2>

      <Link
        className="nav"
        to={`/opportunities/new?city=${encodeURIComponent(city)}`}
      >
        add opportunities
      </Link>

      {opportunities.length === 0 ? (
        <p className="muted">No opportunities found for this city.</p>
      ) : (
        <ul className="cards">
          {opportunities.map(
            ({
              id,
              professionName,
              description,
              hours,
              mobile,
              email,
              legacyCity,
              legacySuburb,
            }) => (
              <li key={id} className="card">
                <div className="opportunity">
                  <span className="title">{professionName}</span>
                  <div className="time-opportunity">
                    <p>
                      City: <span className="data">{legacyCity || city}</span>
                    </p>
                    <p>
                      Suburb:{' '}
                      <span className="data">{legacySuburb || '—'}</span>
                    </p>
                    <p>
                      Mobile: <span className="data">{mobile || '—'}</span>
                    </p>
                    <p>
                      Email: <span className="data">{email || '—'}</span>
                    </p>
                    <p>
                      Hours: <span className="data">{hours || '—'}</span>
                    </p>
                  </div>
                </div>
                <p className="opportunity-description data">
                  {description || 'No description.'}
                </p>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  )
}
