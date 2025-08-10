import { createRoutesFromElements, Route } from 'react-router-dom'
import CityOpportunity from './components/CityOpportunity.tsx'
//import NewOpportunity from './components/NewOpportunity.tsx'
import OpportunitiesList from './components/OpportunitiesList.tsx'
import Layout from './components/Layout.tsx'
import EditOpportunity from './components/EditOpportinity.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<OpportunitiesList />} />
    <Route path="cities/:city" element={<CityOpportunity />} />
    <Route path="/opportunities" element={<OpportunitiesList />} />
    <Route path="/opportunities/:id/edit" element={<EditOpportunity />} />
    {/* <Route path="/events/add/:id" element={<NewOpportunity />} /> */}
  </Route>,
)
