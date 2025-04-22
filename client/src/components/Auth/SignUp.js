import React from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    error: ''
  };

  handleChange = (field) => (event) => {
    this.setState({ [field]: event.target.value, error: '' });
  };

  onSubmitSignUp = () => {
    const { email, password, name } = this.state;
    if (!name || !email || !password) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }

    fetch('http://localhost:3000/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.setState({ email: '', password: '', name: '', error: '' });
        } else {
          this.setState({ error: 'Sign Up failed. Please try again.' });
        }
      })
      .catch(() => this.setState({ error: 'Server error. Please try again.' }));
  };

  render() {
    const { onRouteChange } = this.props;
    const { email, password, name, error } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <TextInput id="name" label="Name" value={name} onChange={this.handleChange('name')} />
              <TextInput id="email" label="Email" type="email" value={email} onChange={this.handleChange('email')} />
              <PasswordInput id="password" value={password} onChange={this.handleChange('password')} />
              <FormErrorMessage message={error} />
            </fieldset>
            <div className="mt3">
              <input
                onClick={this.onSubmitSignUp}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign Up"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('login')} className="f6 link dim black db pointer">Already have an account? Login</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignUp;
