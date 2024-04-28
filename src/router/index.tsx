import {Navigate} from 'react-router-dom';
import Template from '../Template';
import Home from '../pages/Home';
import React from 'react';

export default [
  {
    path: '/',
    element: <Template />,
    children: [
      {
        path: '/admin',
        element: <Home />,
        handle: {title: 'HOME'},
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to={'/'} replace={true} />,
  },
];
