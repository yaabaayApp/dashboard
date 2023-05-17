import React from 'react'
import { Routes } from 'react-router-dom'

// document.location.href = 'http://localhost:3000/#/dashboard'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Auth
const UserCreateOrEdit = React.lazy(() => import('./views/auth/users/CreateOrEdit'))
const UserControl = React.lazy(() => import('./views/auth/users/Control'))
const Profile = React.lazy(() => import('./views/auth/login/Profile'))

//CONTACT-US [ contact us ]
const contactUsCreateOrEdit = React.lazy(() => import('./views/contactUs/CreateOrEdit'))
const contactUsControl = React.lazy(() => import('./views/contactUs/Control'))

const introCreateOrEdit = React.lazy(() => import('./views/content/intros/CreateOrEdit'))
const introControl = React.lazy(() => import('./views/content/intros/Control'))

const sliderCreateOrEdit = React.lazy(() => import('./views/content/sliders/CreateOrEdit'))
const slidersControl = React.lazy(() => import('./views/content/sliders/Control'))

const FAQsCreateOrEdit = React.lazy(() => import('./views/content/faq/CreateOrEdit'))
const FAQsControl = React.lazy(() => import('./views/content/faq/Control'))

const settingsControl = React.lazy(() => import('./views/other/settings/Control'))

const categoryCreateOrEdit = React.lazy(() => import('./views/categories/categories/CreateOrEdit'))
const categoryControl = React.lazy(() => import('./views/categories/categories/Control'))

const categoryMedia = React.lazy(() => import('./views/categories/categories/media/Media'))
const createMedia = React.lazy(() => import('./views/categories/categories/media/CreateMedia'))

const categoryOrderCreateOrEdit = React.lazy(() => import('./views/categories/categoriesOrders/CreateOrEdit'))
const categoryOrderControl = React.lazy(() => import('./views/categories/categoriesOrders/Control'))

const PrivacyPolicyPage = React.lazy(() => import('./views/frontend/PrivacyPolicyPage'))

//  CONTENT [ Intros ]

const routes = [
  //{ path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/privacy', name: 'Privacy Policy', element: PrivacyPolicyPage },
  { path: '/admin', exact: true, name: 'Home', element: Dashboard },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/admin/userCreate', name: 'Add New User', element: UserCreateOrEdit },
  { path: '/admin/userEdit/:userId', name: 'Edit User', element: UserCreateOrEdit },
  { path: '/admin/userAgents/:id', name: 'Users Control', element: UserControl },
  { path: '/admin/userControl/:roleId', name: 'Users Control', element: UserControl },
  // { path: '/userControl', name: 'Users Control', element: UserControl },
  { path: '/admin/profile/:userId', name: 'Admin Profile', element: Profile },

  { path: '/admin/contactUsCreate', name: 'Write a Contact Form', element: contactUsCreateOrEdit },
  { path: '/admin/contactUsEdit/:contactUsId', name: 'Edit Contact Form', element: contactUsCreateOrEdit },
  { path: '/admin/contactUsControl', name: 'Inbox', element: contactUsControl },

  { path: '/admin/introCreate', name: 'Add Intro', element: introCreateOrEdit },
  { path: '/admin/introEdit/:introId', name: 'Edit Intro', element: introCreateOrEdit },
  { path: '/admin/introControl', name: 'Intros  Control', element: introControl },

  { path: '/admin/sliderCreate', name: 'Add Slider', element: sliderCreateOrEdit },
  { path: '/admin/sliderEdit/:sliderId', name: 'Edit Slider', element: sliderCreateOrEdit },
  { path: '/admin/slidersControl', name: 'Slider Control', element: slidersControl },

  { path: '/admin/createFAQ', name: 'Add Frequently Asked Question', element: FAQsCreateOrEdit },
  { path: '/admin/editFAQ/:FAQId', name: 'Edit Frequently Asked Question', element: FAQsCreateOrEdit },
  { path: '/admin/FAQsControl', name: 'Frequently Asked Questions Control', element: FAQsControl },

  { path: '/admin/settingsControl', name: 'Settings Control', element: settingsControl },

  //Categories
  { path: '/admin/addCategory', name: 'Create Service', element: categoryCreateOrEdit },
  { path: '/admin/categoryEdit/:categoryId', name: 'Edit Service', element: categoryCreateOrEdit },
  { path: '/admin/categoryControl/:mainCategory?', name: 'Services Control', element: categoryControl },

  { path: '/admin/categoryMedia/:categoryId', name: 'Service Media Control', element: categoryMedia },
  { path: '/admin/createMedia/:categoryId', name: 'Add Files To Service Media', element: createMedia },

  { path: '/admin/categoryOrderControl', name: 'Leads Control', element: categoryOrderControl },
  { path: '/admin/categoryOrderCreate', name: 'Create Order', element: categoryOrderCreateOrEdit },
  { path: '/admin/categoryOrderEdit/:categoryOrderId', name: 'Edit Section', element: categoryOrderCreateOrEdit },
]

export default routes
