import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import RequinSample from './components/RequinSample'
import AdminDashboard from './components/AdminDashboard'
import SampleAdmin from './components/SampleAdmin'
import UserDetails from './components/UserDetails'
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <RequinSample />
        },
        {
          path: '/home',
          element: <RequinSample />
        },
        {
          path: '/sample',
          element: <RequinSample />
        },
        {
          path: '/admin-dashboard',
          element: <AdminDashboard/>
        },
        {
          path: '/admin-dashboard/sample',
          element: <SampleAdmin/>
        },
        {
          path: '/admin-dashboard/userDetails',
          element: <UserDetails/>
        }
      ]
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
