import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../layouts';
import CreateTournaments from '../pages/CreateTournaments';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Tournaments from '../pages/Tournaments';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { 
          element: <Navigate to="/dashboard" />, 
          index: true 
        },
        { 
          path: 'dashboard', 
          element: <Dashboard /> 
        },
        { 
          path: 'tournaments', 
          element: <Tournaments />,
        },
        {
          path: 'create-tournaments',
          element: <CreateTournaments />
        }
      ],
    },
    { 
      path: '404', 
      element: <Page404 /> 
    },
    { 
      path: 'login', 
      element: <Login /> 
    },
    { 
      path: '*', 
      element: <Navigate to="/404" />, 
    },
  ]);

  return routes;
}
