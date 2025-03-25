// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/auth/login', { email, password });
//             localStorage.setItem('token', res.data.token);
//             navigate('/dashboard'); // Redirect after login
//         } catch (error) {
//             alert('Invalid login credentials');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       localStorage.setItem("token", data.token); // Save token
//       navigate("/dashboard"); // Redirect to dashboard
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       {/* ➡️ Add a link to Sign Up */}
//       <p>
//         Don't have an account?{" "}
//         <span
//           style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
//           onClick={() => navigate("/signup")}
//         >
//           Sign Up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css"; // ✅ Import Login CSS

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//         const response = await fetch("http://localhost:5000/auth/login", { 
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.error || "Login failed");
//         }

//         // ✅ Store the token correctly
//         localStorage.setItem("token", data.token);

//         // ✅ Redirect to dashboard
//         setSuccess("Login successful! Redirecting...");
//         // setTimeout(() => navigate("/dashboard"), 1000);
//         setTimeout(() => {
//             window.location.href = "/dashboard"; // ✅ Forces full reload to re-read localStorage
//         }, 1000);
//     } catch (err) {
//         setError(err.message);
//     }
// };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
      
//       <form className="login-form" onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <p className="auth-link" onClick={() => navigate("/signup")}>
//         Don't have an account? Sign up
//       </p>
//     </div>
//   );
// };

// export default Login;












import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const response = await fetch("http://localhost:5000/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.error || "Login failed");
  //     }

  //     // Save token and log it for debugging
  //     localStorage.setItem("token", data.token);
  //     console.log("Token saved after login:", data.token);

  //     setSuccess("Login successful! Redirecting...");
  //     setTimeout(() => navigate("/dashboard"), 1000);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        localStorage.setItem("token", data.token);

        console.log("✅ Dispatching login event...");  // 🟢 Debugging log
        window.dispatchEvent(new Event("login"));

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
        setError(err.message);
    }
};

  

  // Rest of the component remains unchanged
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-link" onClick={() => navigate("/signup")}>
        Don't have an account? Sign up
      </p>
    </div>
  );
};

export default Login;