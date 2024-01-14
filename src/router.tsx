import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'layouts/SidebarLayout';
import BaseLayout from 'layouts/BaseLayout';
import { Overview } from 'modules/overview';
import Login from 'modules/auth/pages/Login';

// Pages

// Dashboards
const Crypto = lazy(() => import('modules/dashboards/Crypto'));
const Register = lazy(() => import('modules/auth/pages/Register'));
const ForgotPassword = lazy(() => import('modules/auth/pages/ForgotPassword'));
const ForgotPasswordSubmit = lazy(() => import('modules/auth/pages/ForgotPasswordSubmit'));
const Messenger = lazy(() => import('modules/applications/Messenger'));
const Transactions = lazy(() => import('modules/applications/Transactions'));
const UserProfile = lazy(() => import('modules/applications/Users/profile'));
const UserSettings = lazy(() => import('modules/applications/Users/settings'));
const Buttons = lazy(() => import('modules/pages/Components/Buttons'));
const Modals = lazy(() => import('modules/pages/Components/Modals'));
const Accordions = lazy(() => import('modules/pages/Components/Accordions'));
const Tabs = lazy(() => import('modules/pages/Components/Tabs'));
const Badges = lazy(() => import('modules/pages/Components/Badges'));
const Tooltips = lazy(() => import('modules/pages/Components/Tooltips'));
const Avatars = lazy(() => import('modules/pages/Components/Avatars'));
const Cards = lazy(() => import('modules/pages/Components/Cards'));
const Forms = lazy(() => import('modules/pages/Components/Forms'));

// Status
const Status404 = lazy(() => import('modules/pages/Status/Status404'));
const Status500 = lazy(() => import('modules/pages/Status/Status500'));
const StatusComingSoon = lazy(() => import('modules/pages/Status/ComingSoon'));
const StatusMaintenance = lazy(() => import('modules/pages/Status/Maintenance'));

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
