// src/components/Auth/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated, logout } from '../../api/authAPI';
import '../../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Task Manager</Link>
      </div>

      <div className="nav-links">
        {authed ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <span className="nav-user">Welcome, {user?.username}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}







































































































// import React from 'react'
// import '../../styles/Navbar.css';

// export default function Navbar({ isLoggedIn = false, user, onLogout }) {
//     return (
//         <nav className="navbar">
//             <div className="navbar-brand">
//                 <h1>Task Manager</h1>
//             </div>

//             <div className="navbar-menu">
//                 {isLoggedIn ? (
//                     <div className="navbar-user">
//                         <span className="welcome-text">
//                             Hello, {user?.username || 'User'}!
//                         </span>

//                         <button
//                             className="logout-btn"
//                             onClick={onLogout}>Log out
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <a className="btn" href="/login" target='_self' title='Log in first!'>You have to log in first</a>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     )
// }
