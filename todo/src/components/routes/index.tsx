import { createBrowserRouter, Navigate } from "react-router";
import { route } from "./route";
import LoginPage from "../../features/auth/login";
import RegisterPage from "../../features/auth/register";
import Dashboard from "../../features/dashboard";
import ActiveTasks from "../../features/tasks/pages/ActiveTasks";
import Layout from "../../shared/ui/layout";
import CompletedTasks from "../../features/tasks/pages/CompletedTasks";
export const router = createBrowserRouter([
  {
    path: route.homePath,
    element: <Navigate to={route.loginPath} />,
  },
  {
    path: route.loginPath,
    element: <LoginPage />,
  },
  {
    path: route.registerPath,
    element: <RegisterPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: route.dashboardPath,
        element: <Dashboard />,
      },
      {
        path: route.activeTaskPath,
        element: <ActiveTasks />,
      },
      {
        path: route.completedTaskPath,
        element: <CompletedTasks />,
      },
    ],
  },
]);
