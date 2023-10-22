import Layout from '@/components/Layout/Layout';
import { ButtonUseDemo } from '@/pages/ButtonDemo';
import { CountDownDemo } from '@/pages/countDownDemo';
import { SearchUseDemo } from '@/pages/SearchDemo';
import { TabDemo } from '@/pages/TabDemo';
import { TableDemo } from '@/pages/TableDemo';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/button',
        element: <ButtonUseDemo />,
      },
      {
        path: '/search',
        element: <SearchUseDemo />,
      },
      {
        path: '/countdown',
        element: <CountDownDemo />,
      },
      {
        path: '/table',
        element: <TableDemo />,
      },
      {
        path: 'tab',
        element: <TabDemo />,
      },
    ],
  },
]);
