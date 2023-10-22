import { createBrowserRouter } from 'react-router-dom';
import { ButtonUseDemo } from '@/pages/ButtonDemo';
import { SearchUseDemo } from '@/pages/SearchDemo';
import { CountDownDemo } from '@/pages/countDownDemo';
import Layout from '@/components/Layout/Layout';

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
      }
    ],
  },
]);
