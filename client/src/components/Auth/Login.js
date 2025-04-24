import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

const Login = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle changes for input fields, clearing the error message when typing begins
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setError('');
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  // Function to handle login submission
  const onSubmitLogin = () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Send login credentials to the server endpoint
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          // If login is successful, update user data and change route to home
          loadUser(user);
          onRouteChange('home');
          // Clear the login form
          setEmail('');
          setPassword('');
          setError('');
        } else {
          setError('Invalid credentials.');
        }
      })
      .catch(() => setError('Server error. Please try again.'));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Login</legend>
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleChange('email')}
            />
            <PasswordInput
              id="password"
              value={password}
              onChange={handleChange('password')}
            />
            <FormErrorMessage message={error} />
          </fieldset>
          <div className="mt3">
            <input
              onClick={onSubmitLogin}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Login"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Login;
