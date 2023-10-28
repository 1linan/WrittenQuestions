import Layout from '@/components/Layout/Layout';
import { UserList } from '@/pages/userList/UserList';
// import { lazy } from 'react';
import { AddUserInfo } from '@/pages/addUserInfo';
import { createBrowserRouter } from 'react-router-dom';
// const UserList = lazy(() => import('../pages/userList/UserList'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/userlist',
        element: <UserList />,
      },
      {
        path: '/add',
        element: <AddUserInfo />,
      },
    ],
  },
]);
