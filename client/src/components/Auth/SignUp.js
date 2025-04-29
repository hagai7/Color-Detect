import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';

/**
 * SignUp Component - Handles the user registration process including form input, validation, 
 * and server interaction for creating a new user account.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.loadUser - Callback function to load user data after successful sign-up
 * @param {Function} props.onRouteChange - Callback function to navigate between routes (e.g., login, home)
 * 
 * @returns {JSX.Element} The SignUp component.
 */
const SignUp = ({ loadUser, onRouteChange }) => {
  // State to hold form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // State to hold error messages
  const [error, setError] = useState('');
  
  // State to hold form validation errors
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Reset form when route changes
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
    setFormErrors({
      name: '',
      email: '',
      password: '',
    });
  }, [onRouteChange]);

  /**
   * Handles changes in the input fields by updating the corresponding state.
   * 
   * @param {string} field - The name of the field being changed (name, email, or password)
   * @returns {Function} A function that updates the specific field's state.
   */
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    
    // Reset any previous error when a user types
    setError('');
    setFormErrors({ ...formErrors, [field]: '' });
    
    // Update state based on the field being modified
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  /**
   * Validates the form fields to ensure required values are provided and follow correct formats.
   * 
   * @returns {boolean} True if all fields are valid, otherwise false.
   */
  const validateFields = () => {
    const errors = {
      name: '',
      email: '',
      password: ''
    };

    // Name validation
    if (!name) errors.name = 'Name is required.';
    
    // Email validation
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // Update the state with error messages
    setFormErrors(errors);
    // Return true if there are no errors
    return Object.values(errors).every(error => error === '');
  };

  /**
   * Handles the form submission for the sign-up process.
   * Sends a request to the server to create a new user.
   * If successful, it loads the user data and navigates to the home route.
   */
  const onSubmitSignUp = () => {
    // Validate fields before submitting
    if (!validateFields()) {
      return;
    }

    // Send POST request to the sign-up endpoint
    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => res.json())
      .then(user => {
        // If the user ID is returned, the sign-up was successful
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        } else {
          // Handle errors based on server response
          handleErrors(user, setError);
        }
      })
      .catch(() => {
        setError('We encountered an issue with the server. Please try again later.');
      });
  };

  /**
   * Handles specific error messages based on server response.
   * 
   * @param {string} user - The error message returned from the server
   * @param {Function} setError - The state setter function to update the error state
   */
  const handleErrors = (user, setError) => {
    if (user === 'Email is already registered') {
      setError('The email you entered is already associated with an account.');
    } else if (user === 'Name is already taken') {
      setError('The name you entered is already in use.');
    } else {
      setError('Sign Up failed. Please try again.');
    }
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
            
            {/* Name Field */}
            <TextInput 
              id="name" 
              label="Name" 
              value={name} 
              onChange={handleChange('name')} 
            />
            {formErrors.name && <p className="red f6">{formErrors.name}</p>}
            
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
            
            {/* Server Error Message */}
            {error && <p className="red f6">{error}</p>}
          </fieldset>
          <div className="mt3">
            <input
              onClick={onSubmitSignUp}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign Up"
            />
          </div>
          <div className="lh-copy mt3">
            <p 
              onClick={() => onRouteChange('login')} 
              className="f6 link dim black db pointer">
              Already have an account? Login
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignUp;
