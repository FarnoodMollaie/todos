import { createBrowserRouter, Navigate } from "react-router";
import { route } from "./route";
import LoginPage from "../../features/auth/login";
import RegisterPage from "../../features/auth/register";
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
]);
