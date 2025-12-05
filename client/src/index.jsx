import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import UserPage from './pages/user.jsx';
import LongTextPage from './pages/long-text.jsx';
import WebSocketRequstPage from './pages/websocket-request.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true, // This makes HomePage the default child route for '/'
        element: <UserPage />,
      },
      {
        path: '/long-text', // This makes HomePage the default child route for '/'
        element: <LongTextPage />,
      },
      {
        path: '/websocket-request', // This makes HomePage the default child route for '/'
        element: <WebSocketRequstPage />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);