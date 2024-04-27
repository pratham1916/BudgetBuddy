import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../Styles/Navbar.css";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isAuth = useSelector(state => state.login.isAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };
  
  const setActiveLink = ({ isActive }) => isActive ? "link link-active" : "link";

  return (
    <nav className="navbar">
      <h2>BudgetBuddy</h2>  
      <div style={{ display: "flex", gap: "10px" }}>
        <NavLink className={setActiveLink} to="/">Home</NavLink>
        <NavLink className={setActiveLink} to="/dashboard">Dashboard</NavLink>
        {isAuth ? (
          <NavLink className={setActiveLink} to="/logout" onClick={handleLogout}>Logout</NavLink>
        ) : (
          <>
            <NavLink className={setActiveLink} to="/login">Login</NavLink>
            <NavLink className={setActiveLink} to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
