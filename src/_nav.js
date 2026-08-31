import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilBell,
  cilChartPie,
  cilCoffee,
  cilLayers,
  cilWallet,
  cilMoney,
  cilAudioDescription,
  cilMug,
  cilSpeedometer,
  cilPeople,
  cilUser,
  cilUserFollow,
  cilBadge,
  cilBuilding,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  // ── MAIN ─────────────────────────────────────────────────────────────────
  {
    component: CNavTitle,
    name: 'Operations',
  },
  {
    component: CNavItem,
    name: 'Machines',
    to: '/pages/nav/machines',
    icon: <CIcon icon={cilCoffee} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Items',
    to: '/pages/nav/items',
    icon: <CIcon icon={cilMug} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/pages/nav/brewstocks',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Alerts',
    to: '/pages/nav/machinealerts',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Promotions',
    to: '/pages/nav/promotions',
    icon: <CIcon icon={cilAudioDescription} customClassName="nav-icon" />,
  },

  // ── USER MANAGEMENT ───────────────────────────────────────────────────────
  {
    component: CNavTitle,
    name: 'User Management',
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/pages/nav/customers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Agents',
    to: '/pages/nav/agents',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Organizations',
    to: '/pages/nav/merchants',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },

  // ── FINANCE ───────────────────────────────────────────────────────────────
  {
    component: CNavTitle,
    name: 'Finance',
  },
  {
    component: CNavItem,
    name: 'Wallets',
    to: '/pages/nav/customerwallets',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Memberships',
    to: '/pages/nav/memberships',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sales Reports',
    to: '/pages/nav/salesreportings',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
]

export default _nav
