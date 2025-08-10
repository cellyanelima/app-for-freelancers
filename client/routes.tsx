import { createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import CityOpportunity from './components/CityOpportunity'
import NewOpportunity from './components/NewOpportunity'
import OpportunitiesList from './components/OpportunitiesList'
import Layout from './components/Layout'
import EditOpportunity from './components/EditOpportunity'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to="cities/auckland" replace />} />
    <Route path="cities/:city" element={<CityOpportunity />} />
    <Route path="opportunities" element={<OpportunitiesList />} />
    <Route path="opportunities/new" element={<NewOpportunity />} />
    <Route path="opportunities/:id/edit" element={<EditOpportunity />} />
  </Route>,
)
