import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUser,
  cilVideo,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  
  {
    component: CNavGroup,
    name: 'Manage Video',
    to: '/Video',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Video',
        to: '/Video',
      },
      {
        component: CNavItem,
        name: 'Add Video',
        to: '/addVideo',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Manage Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/users',
      }
    ],
  },
 
   {
    component: CNavGroup,
    name: 'Reports',
    to: '/transaction',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tranasaction',
        to: '/reporttransaction',
      },
      {
        component: CNavItem,
        name: 'Revenue',
        to: '/reportrevenue',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'CMS',
    to: '/cms',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
   
  },
   {
    component: CNavItem,
    name: 'Login History',
    to: '/loginhistory',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
   
  },
]

export default _nav
