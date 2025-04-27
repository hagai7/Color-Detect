import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

const Login = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  // Handle changes for input fields, clearing the error message when typing begins
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setError('');
    setFormErrors({ ...formErrors, [field]: '' });

    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  // Field-specific validation
  const validateFields = () => {
    const errors = {
      email: '',
      password: ''
    };

    // Email validation
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  // Function to handle login submission
  const onSubmitLogin = () => {
    // Validate fields
    if (!validateFields()) {
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
          setError('Invalid credentials. Please try again.');
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

            {/* Email Field */}
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleChange('email')}
            />
            {formErrors.email && <p className="red f6">{formErrors.email}</p>}

            {/* Password Field */}
            <PasswordInput
              id="password"
              value={password}
              onChange={handleChange('password')}
            />
            {formErrors.password && <p className="red f6">{formErrors.password}</p>}

            {/* Invalid Credentials Error Message */}
            {error && <p className="red f6">{error}</p>}
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
