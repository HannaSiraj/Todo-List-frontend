// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import TodoList from "./components/TodoList";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import "./App.css";

// function App() {
//   // ✅ Store authentication state in React state
//   const isAuthenticated = () => {
//     const token = localStorage.getItem("token");
//     // return token && token !== "undefined"; // Ensure token is valid
//     return token && token !== "undefined" && token !== "null" && token !== "";
//   };

//   const [token, setToken] = useState(isAuthenticated() ? localStorage.getItem("token") : null);

//     // ✅ Cleanup invalid tokens on app load
//     useEffect(() => {
//       if (!isAuthenticated()) {
//         localStorage.removeItem("token");
//         setToken(null);
//       }
//     }, []);

//   // ✅ Sync token with localStorage whenever it changes
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

 

//   // ✅ Listen for login event to update token state
//   useEffect(() => {
//     const handleLoginEvent = () => {
//       setToken(localStorage.getItem("token")); // Update state when login happens
//     };

//     window.addEventListener("login", handleLoginEvent);
//     return () => window.removeEventListener("login", handleLoginEvent);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         {/* <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
//         <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
//         <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup />} /> */}

//         <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
//         <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
//         <Route path="/signup" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />} />        

//         {/* Protected routes */}
//         {/* <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/todo" element={token ? <TodoList token={token} /> : <Navigate to="/login" />} /> */}

//         <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/todo" element={isAuthenticated() ? <TodoList token={token} /> : <Navigate to="/login" />} />



//         {/* Catch-all: Redirect unknown routes */}
//         {/* <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} /> */}

//         <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  // ✅ Improved authentication check
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token && token !== "undefined" && token !== "null" && token !== "";
  };

  const [token, setToken] = useState(isAuthenticated() ? localStorage.getItem("token") : null);

  // ✅ Cleanup invalid tokens on app load
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem("token");
      setToken(null);
    }
  }, []);

  // ✅ Sync token with localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ Listen for login event to update token state
  useEffect(() => {
    const handleLoginEvent = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("login", handleLoginEvent);
    return () => window.removeEventListener("login", handleLoginEvent);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/todo" element={isAuthenticated() ? <TodoList token={token} /> : <Navigate to="/login" />} />

        {/* Catch-all: Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
