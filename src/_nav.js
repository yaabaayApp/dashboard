import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faEnvelopeOpen,
  faDesktop,
  faComments,
  faTachometerAlt, faUserInjured, faUserMd,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: 12}} />,
  },
  {
    component: CNavTitle,
    name: 'Authorization',
  },
  {
    component: CNavGroup,
    name: 'Leads',
    icon: <FontAwesomeIcon icon={faUserInjured} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Create Order',
        to: '/admin/categoryOrderCreate',
      },
      {
        component: CNavItem,
        name: 'Leads Control',
        to: '/admin/categoryOrderControl',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Users',
    icon: <FontAwesomeIcon icon={faUsers} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/admin/userCreate',
      },
      {
        component: CNavItem,
        name: 'Users Control',
        to: '/admin/userControl/customer',
      },
      {
        component: CNavItem,
        name: 'Agent Control',
        to: '/admin/userControl/agent',
      },
      {
        component: CNavItem,
        name: 'Admins Control',
        to: '/admin/userControl/admin',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Services',
    icon: <FontAwesomeIcon icon={faUserMd} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Create Service',
        to: '/admin/addCategory',
      },
      {
        component: CNavItem,
        name: 'Services Control',
        to: '/admin/categoryControl',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Contacts',
    icon: <FontAwesomeIcon icon={faEnvelopeOpen} style={{marginRight: 12}} />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Add Contact',
      //   to: '/contactUsCreate',
      // },
      {
        component: CNavItem,
        name: 'Inbox',
        to: '/admin/contactUsControl',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Screens',
    icon: <FontAwesomeIcon icon={faDesktop} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Add Intro',
        to: '/admin/introCreate',
      },
      {
        component: CNavItem,
        name: 'Intros Control',
        to: '/admin/introControl',
      },
      {
        component: CNavItem,
        name: 'Add Slider',
        to: '/admin/sliderCreate',
      },
      {
        component: CNavItem,
        name: 'Slider Control',
        to: '/admin/slidersControl',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'FAQs',
    icon: <FontAwesomeIcon icon={faComments} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Add FAQ',
        to: '/admin/createFAQ',
      },
      {
        component: CNavItem,
        name: 'FAQs Control',
        to: '/admin/FAQsControl',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <FontAwesomeIcon icon={faCog} style={{marginRight: 12}} />,
    items: [
      {
        component: CNavItem,
        name: 'Settings',
        to: '/admin/settingsControl',
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
