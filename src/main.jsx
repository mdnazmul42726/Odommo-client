import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TopUp from "./pages/Customer/TopUp";
import History from "./pages/Customer/History";
import Refill from "./pages/Customer/Refill";
import Notification from "./pages/Admin/Notification";
import AdminHistory from "./pages/Admin/AdminHistory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },

      // customer
      { path: '/topup', element: <PrivateRoute><TopUp /></PrivateRoute> },
      { path: '/account-refill', element: <PrivateRoute> <Refill /></PrivateRoute> },
      { path: '/transaction-history', element: <PrivateRoute> <History /></PrivateRoute> },

      // admin
      { path: '/notification', element: <AdminRoute><Notification /></AdminRoute> },
      { path: '/payment-history', element: <AdminRoute><AdminHistory /></AdminRoute> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider><RouterProvider router={router} /></AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);