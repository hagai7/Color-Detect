import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

const SignUp = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Generic change handler that updates the corresponding state based on field name
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    // Clear any existing error when a new input is entered
    setError('');
    setFormErrors({ ...formErrors, [field]: '' });
    
    // Update state based on which field is being changed
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  // Field-specific validation
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

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  // Handles sign-up submission
  const onSubmitSignUp = () => {
    // Validate that all fields are filled in and are correct
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
        // If a user id is returned, the sign-up was successful
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
          // Clear form fields and error after successful sign-up
          setEmail('');
          setPassword('');
          setName('');
          setError('');
        } else {
          // Update error state with a failure message from the server
          setError('Sign Up failed. Please try again.');
        }
      })
      .catch(() => {
        setError('We encountered an issue with the server. Please try again later.');
      });
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
