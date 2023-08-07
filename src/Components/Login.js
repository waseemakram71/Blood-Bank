import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Auth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
     
      setLoginError('');
      setSuccessMessage('Login successful!.');
      setLoggedIn(true);
    } catch (error) {
      setLoginError('Failed to login. Please check your email and password.');
    }

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setSuccessMessage('Logout successful!.');
         setEmail('');
    setPassword('');
    } catch (error) {
      console.log('Error during logout:', error);
    }
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    
  };

  return (
    <>
      <div className='main-2'>
        <div className='log'>
          <h2>Login</h2>
          <form action='' onSubmit={submitForm}>
            <div className='email-2'>
              <label htmlFor='email'>Email:</label>
              <input type='text' id='email' placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
              {emailError && <p className='error'>{emailError}</p>}
            </div>
            <div className='password-2'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className='error'>{passwordError}</p>}
            </div>

            {loggedIn ? (
              <>
                <button onClick={handleLogout}>Logout</button>
                {successMessage && <p className='success'>{successMessage}</p>}
                {navigate('/donorForm')}
              </>
            ) : (
              <>
                <button type='submit'>Login</button>
                {successMessage && <p className='success'>{successMessage}</p>}
                {loginError && <p className='error'>{loginError}</p>}
                <p>
                  Not a member?{' '}
                  <span>
                    <Link to='/signupForm'>Signup</Link>
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;