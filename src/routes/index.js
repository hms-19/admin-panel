import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../layouts';
import Dashboard from '../pages/Dashboard';
import Table from '../pages/Table';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'table', element: <Table /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
