import { NavLink } from 'react-router-dom'

export default function LineupNav() {
  return (
    <nav>
      <NavLink to="/cities/auckland">Auckland</NavLink>
      <NavLink to="/cities/wellington">Wellington</NavLink>
      <NavLink to="/cities/christchurch">Christchurch</NavLink>
      <NavLink to="/cities/hamilton">Hamilton</NavLink>
      <NavLink to="/cities/dunedin">Dunedin</NavLink>
      <NavLink to="/cities/tauranga">Tauranga</NavLink>
      <NavLink to="/cities/napier">Napier</NavLink>
      <NavLink className="nav" to="/opportunities">
        All opportunities
      </NavLink>
    </nav>
  )
}
