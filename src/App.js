import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import Login from './Components/Login';
import Home from './Home';
import DonorForm from './Components/DonorForm';
import DonorList from './Components/DonorList';
import Navbar from './Navbar';
import NotFound from './NotFound';
import './App.css';
// import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component
import { auth } from './firebase'; // Import the firebase auth instance

function App() {
  // console.log(window.location.pathname);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is logged in on initial app load
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar loggedIn={loggedIn} handleLogout={() => setLoggedIn(false)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signupForm" element={<SignupForm />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          {/* Conditionally render the DonorForm based on the loggedIn state */}
          {loggedIn && (
            <Route path="/donorForm" element={<DonorForm />} />
          )}
          <Route path="/donorList" element={<DonorList />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;