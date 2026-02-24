import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import Photo from "./pages/Photo";
import ChartPage from "./pages/ChartPage";

function PrivateRoute({ children }) {
  return localStorage.getItem("auth") ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/list" element={<PrivateRoute><List /></PrivateRoute>} />
      <Route path="/details" element={<PrivateRoute><Details /></PrivateRoute>} />
      <Route path="/photo" element={<PrivateRoute><Photo /></PrivateRoute>} />
      <Route path="/chart" element={<PrivateRoute><ChartPage /></PrivateRoute>} />
    </Routes>
  );
}