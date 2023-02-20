import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home/Home';
import ContactForm from './components/FormInput/ContactForm';
import Root from './Root';
import DisplayContacts from './components/DisplayContacts/DisplayContacts';

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/home',
          element: <Home />,
          errorElement: <ErrorPage />
        },
        {
          path: '/add-contact',
          element: <ContactForm />,
          errorElement: <ErrorPage />
        },
        {
          path: '/all-contacts',
          element: <DisplayContacts />,
          errorElement: <ErrorPage />
        },
        {
          path: '/favourites',
          element: <DisplayContacts />,
          errorElement: <ErrorPage />
        },
        {
          path: '/groups',
          element: <DisplayContacts />,
          errorElement: <ErrorPage />
        },
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}


export default AppRoutes