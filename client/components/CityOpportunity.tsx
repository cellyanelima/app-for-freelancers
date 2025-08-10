import { Link, useParams } from 'react-router-dom'
import LineupNav from './LineupNav'
import { useCities } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function CityOpportunity() {
  const { city } = useParams()
  const { data, isError, isPending, error } = useCities(String(city))

  if (isPending) {
    return (
      <>
        <LineupNav />
        <LoadingIndicator />
      </>
    )
  }

  if (isError || !data) {
    return <p>Failed {String(error)}</p>
  }

  const { opportunities } = data
  return (
    <>
      <LineupNav />

      <h2>
        opportunities: <span className="data">{city}</span>
      </h2>

      <Link className="nav" to={`/opportunities/new?city=${city}`}>
        add opportunities
      </Link>

      <ul className="cards">
        {opportunities.map(
          ({
            professionName,
            id,
            city,
            suburb,
            mobile,
            email,
            description,
            hours,
          }) => (
            <li key={id} className="card">
              <div className="opportunity">
                <span className="title">{professionName}</span>
                <div className="time-opportunity">
                  <p>
                    City: <span className="data">{city}</span>
                  </p>
                  <p>
                    Suburb: <span className="data">{suburb}</span>
                  </p>
                  <p>
                    Mobile: <span className="data">{mobile}</span>
                  </p>
                  <p>
                    Email: <span className="data">{email}</span>
                  </p>
                  <p>
                    Hours: <span className="data">{hours}</span>
                  </p>
                </div>
              </div>
              <p className="opportunity-description data">{description}</p>
              {/*<Link to={`/opportunities/${id}/edit`}>edit opportunity</Link>*/}
            </li>
          ),
        )}
      </ul>
    </>
  )
}
