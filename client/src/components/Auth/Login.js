import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';

/**
 * Login component handles the login process by accepting the user's email
 * and password, performing form validation, and submitting login requests.
 * It provides feedback on login success or failure.
 * 
 * @param {function} loadUser - A function to load the user information after a successful login.
 * @param {function} onRouteChange - A function to handle route changes (used to navigate to different views).
 * @param {string} route - Current route (used to reset form when route changes).
 * 
 * @returns {JSX.Element} A JSX structure representing the login form and its logic.
 */
const Login = ({ loadUser, onRouteChange, route }) => {
  const [email, setEmail] = useState('');  // State to store email input value
  const [password, setPassword] = useState('');  // State to store password input value
  const [error, setError] = useState('');  // State to store any general error message
  const [formErrors, setFormErrors] = useState({
    email: '',  // Stores email validation error message
    password: ''  // Stores password validation error message
  });

  // Reset form and error states when the route changes (useEffect hook)
  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
    setFormErrors({
      email: '',
      password: ''
    });
  }, [route]);

  /**
   * Handle changes in the input fields (email, password).
   * Clears the error messages when the user modifies the fields.
   * 
   * @param {string} field - Name of the field being modified (either 'email' or 'password').
   * @returns {function} A function to handle input change event.
   */
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setError('');
    setFormErrors({ ...formErrors, [field]: '' });

    if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
  };

  /**
   * Validates the email and password fields.
   * Displays appropriate error messages if validation fails.
   * 
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  const validateFields = () => {
    const errors = {
      email: '',
      password: ''
    };

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  /**
   * Handles form submission.
   * Sends a POST request with email and password to the server.
   * If the login is successful, it loads the user and changes the route.
   * If there is an error (invalid credentials), it displays an error message.
   */
  const onSubmitLogin = () => {
    if (!validateFields()) return;

    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);  // Load user data into the application
          onRouteChange('home');  // Redirect to the home page
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

            {/* Email Input */}
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleChange('email')}
            />
            {formErrors.email && <p className="red f6">{formErrors.email}</p>}

            {/* Password Input */}
            <PasswordInput
              id="password"
              value={password}
              onChange={handleChange('password')}
            />
            {formErrors.password && <p className="red f6">{formErrors.password}</p>}
            {error && <p className="red f6">{error}</p>}
          </fieldset>

          {/* Submit Button */}
          <div className="mt3">
            <input
              onClick={onSubmitLogin}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Login"
            />
          </div>

          {/* Register Link */}
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
