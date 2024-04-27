import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./router/root";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JenisPage } from "./pages/JenisPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard/jenis',
    element: <JenisPage />,
  },
  {
    path: '/dashboard/tanaman',
    element: <div>Tanaman</div>
  }
]);

export const App = () => <RouterProvider router={router} />;
