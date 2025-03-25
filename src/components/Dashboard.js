import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        checkAuth();  // ✅ Check authentication on page load

        // ✅ Listen for login event to re-check authentication
        const handleLoginEvent = () => checkAuth();
        window.addEventListener("login", handleLoginEvent);

        return () => {
            window.removeEventListener("login", handleLoginEvent);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login", { replace: true });

        // ✅ Force a full reload (optional)
        window.location.reload();
    };

    if (!isAuthenticated) return null;

    return (
        <div>
            <button onClick={handleLogout}>Logout ↩️</button>
            <TodoList />  {/* ✅ Now updates automatically after login */}
        </div>
    );
};

export default Dashboard;
