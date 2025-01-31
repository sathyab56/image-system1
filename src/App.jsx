import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // State to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("login") !== null);

    // Effect to listen for login/logout changes
    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(localStorage.getItem("login") !== null);
        };

        // Listen for changes in localStorage (e.g., when user logs in or out)
        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
        };
    }, []);

    return (
        <>
            <ToastContainer />
            <Routes>
                {/* Redirect to /order if logged in, otherwise to /login */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/order" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Home />} />
                {/* Catch-all route for any undefined paths */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/order" : "/login"} />} />
            </Routes>
        </>
    );
}

export default App;
