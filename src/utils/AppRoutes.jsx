import Login from "../components/Login";
import Signup from "../components/SingUp";
import Home from "../components/Home";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export default [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/ForgotPassword",
    element: (
      <>
        <ForgotPassword />
      </>
    ),
  },
  {
    path: "/ResetPassword",
    element: (
      <>
        <ResetPassword />
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
