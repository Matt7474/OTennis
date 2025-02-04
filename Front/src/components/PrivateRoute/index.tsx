import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const token = localStorage.getItem("token"); // Vérifie si l'utilisateur est connecté

    return token ? <Outlet /> : <Navigate to="/login" />;
};