// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//         const response = await fetch("http://localhost:5000/auth/register", {  // ✅ Correct URL
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });
        

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Registration failed");
//       }

//       const data = await response.json();
//       setSuccess("Registration successful! Redirecting...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
      
//       <form onSubmit={handleRegister}>
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
//         <button type="submit">Register</button>
//       </form>

//       <p>
//         Already have an account? {" "}
//         <span
//           style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
//           onClick={() => navigate("/login")}
//         >
//           Login
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Signup.css"; // ✅ Import Signup CSS

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch("http://localhost:5000/auth/register", { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Registration failed");
//       }

//       setSuccess("Registration successful! Redirecting...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
      
//       <form className="signup-form" onSubmit={handleRegister}>
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
//         <button type="submit">Register</button>
//       </form>

//       <p className="auth-link" onClick={() => navigate("/login")}>
//         Already have an account? Login
//       </p>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // ✅ Import Signup CSS

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic password validation (optional)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      
      {/* Accessibility - Live announcements */}
      <p className="error" aria-live="assertive">{error}</p>
      <p className="success" aria-live="polite">{success}</p>

      <form className="signup-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
      </form>

      <p className="auth-link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Signup;
