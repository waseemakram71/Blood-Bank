import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from './firebase'; // Replace './firebase' with the correct path to your firebase.js file

const Navbar = ({ loggedIn }) => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        console.log('User signed out successfully.');
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
  };

  return (
    <nav style={{ display: 'flex', backgroundColor: '#fff', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
      <div>
        <p style={{ fontWeight: 1000, color: 'blue',width:'auto',margin:'auto' }}>Blood Bank<span style={{color:"black", fontStyle:'italic'}}> Management System</span></p>
      </div>

      <ul style={{ display: 'flex', listStyle: 'none', gap: '60px', textDecoration: 'none' }}>
        <li>
          <NavLink className="nav-bar-link" to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-bar-link" to="/signupForm">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-bar-link" to="/login">
            Login
          </NavLink>
        </li>
        
        {/* Conditionally render the 'Add Donor' link based on the loggedIn prop */}
        {loggedIn && (
          <li>
            <NavLink className="nav-bar-link" to="/donorForm">
              Add Donor
            </NavLink>
          </li>
        )}

        <li>
          <NavLink className="nav-bar-link" to="/donorList">
            Donor List
          </NavLink>
        </li>

        {/* Conditionally render the 'Sign Out' button based on the loggedIn prop */}
        {loggedIn && (
          <li>
            <button onClick={handleLogout} style={{width:"auto" }}>
              LogOut
            </button>
          </li>
        )}
      </ul>
      <div></div>
    </nav>
  );
};

export default Navbar;
