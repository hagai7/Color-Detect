import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

const SignUp = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Generic change handler that updates the corresponding state based on field name
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    // Clear any existing error when a new input is entered
    setError('');
    // Update state based on which field is being changed
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  // Handles sign up submission
  const onSubmitSignUp = () => {
    // Validate that all fields are filled in
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Send POST request to the sign up endpoint
    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => res.json())
      .then(user => {
        // If a user id is returned, the sign up was successful
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
          // Clear form fields and error after successful sign up
          setEmail('');
          setPassword('');
          setName('');
          setError('');
        } else {
          // Otherwise, update error state with a failure message
          setError('Sign Up failed. Please try again.');
        }
      })
      .catch(() => setError('Server error. Please try again.'));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
            <TextInput 
              id="name" 
              label="Name" 
              value={name} 
              onChange={handleChange('name')} 
            />
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
