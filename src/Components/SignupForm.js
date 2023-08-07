import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allEntry, setAllEntry] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [user, setUser] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [signedIn, setSignedIn] = useState(false);

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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setSuccessMessage('Signup successful! You can now log in.');
      setSignedIn(true)
    } catch (error) {
      console.log(error.message);
    }

    const newEntry = { email: email, password: password };
    setAllEntry([...allEntry, newEntry]);

    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <>
      <div className='main'>
        <div className='sign'>
          <h2>Signup For Donate</h2>
          <form action='' onSubmit={submitForm}>
            <div className='email'>
              <label htmlFor='email'>Email:</label>
              <input
                type='text'
                id='email'
                placeholder='Email'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className='error'>{emailError}</p>}
            </div>
            <div className='password'>
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
            <button type='submit'>Signup</button>
            {successMessage && <p className='success'>{successMessage}</p>}
            {signedIn && navigate('/Login')}
            <p>
              Already have an account?{''}
              <span>
                <Link to='/Login'>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
