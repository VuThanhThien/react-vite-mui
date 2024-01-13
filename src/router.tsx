import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'layouts/SidebarLayout';
import BaseLayout from 'layouts/BaseLayout';
import { Overview } from 'content/overview';
import Login from 'content/auth/pages/Login';

// Pages

// Dashboards
const Crypto = lazy(() => import('content/dashboards/Crypto'));
const Register = lazy(() => import('content/auth/pages/Register'));
const ForgotPassword = lazy(() => import('content/auth/pages/ForgotPassword'));
const ForgotPasswordSubmit = lazy(() => import('content/auth/pages/ForgotPasswordSubmit'));
const Messenger = lazy(() => import('content/applications/Messenger'));
const Transactions = lazy(() => import('content/applications/Transactions'));
const UserProfile = lazy(() => import('content/applications/Users/profile'));
const UserSettings = lazy(() => import('content/applications/Users/settings'));
const Buttons = lazy(() => import('content/pages/Components/Buttons'));
const Modals = lazy(() => import('content/pages/Components/Modals'));
const Accordions = lazy(() => import('content/pages/Components/Accordions'));
const Tabs = lazy(() => import('content/pages/Components/Tabs'));
const Badges = lazy(() => import('content/pages/Components/Badges'));
const Tooltips = lazy(() => import('content/pages/Components/Tooltips'));
const Avatars = lazy(() => import('content/pages/Components/Avatars'));
const Cards = lazy(() => import('content/pages/Components/Cards'));
const Forms = lazy(() => import('content/pages/Components/Forms'));

// Status
const Status404 = lazy(() => import('content/pages/Status/Status404'));
const Status500 = lazy(() => import('content/pages/Status/Status500'));
const StatusComingSoon = lazy(() => import('content/pages/Status/ComingSoon'));
const StatusMaintenance = lazy(() => import('content/pages/Status/Maintenance'));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/forgot-password-submit',
        element: <ForgotPasswordSubmit />,
      },
      {
        path: 'overview',
        element: <Navigate to='/' replace />,
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to='404' replace />,
          },
          {
            path: '404',
            element: <Status404 />,
          },
          {
            path: '500',
            element: <Status500 />,
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />,
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404 />,
      },
    ],
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='crypto' replace />,
      },
      {
        path: 'crypto',
        element: <Crypto />,
      },
      {
        path: 'messenger',
        element: <Messenger />,
      },
    ],
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='transactions' replace />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to='details' replace />,
          },
          {
            path: 'details',
            element: <UserProfile />,
          },
          {
            path: 'settings',
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='buttons' replace />,
      },
      {
        path: 'buttons',
        element: <Buttons />,
      },
      {
        path: 'modals',
        element: <Modals />,
      },
      {
        path: 'accordions',
        element: <Accordions />,
      },
      {
        path: 'tabs',
        element: <Tabs />,
      },
      {
        path: 'badges',
        element: <Badges />,
      },
      {
        path: 'tooltips',
        element: <Tooltips />,
      },
      {
        path: 'avatars',
        element: <Avatars />,
      },
      {
        path: 'cards',
        element: <Cards />,
      },
      {
        path: 'forms',
        element: <Forms />,
      },
    ],
  },
];

export default routes;
