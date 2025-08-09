//import LocationsNav from './LocationsNav.tsx'
import { Link } from 'react-router-dom'
import { useOpportunities } from '../hooks/api.ts'
//import LoadingIndicator from './LoadingIndicator.tsx'

export default function LocationsList() {
  const { isPending, isError, data } = useOpportunities()

  if (isPending) {
    return (
      <>
        {/*<LocationsNav />
        <LoadingIndicator />*/}
      </>
    )
  }

  if (isError) {
    return <>Oops</>
  }

  return (
    <>
      {/*<LocationsNav />*/}
      <h2>Opportunities:</h2>
      <ul className="cards">
        {data?.opportunities.map((data) => (
          <li key={data.id} className="card">
            <div className="opportunity">
              <span className="title">{data.name}</span>
              <p className="data">{data.description}</p>
              <Link to={`/opportunities/${data.id}/edit`}>
                edit opportunity
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
