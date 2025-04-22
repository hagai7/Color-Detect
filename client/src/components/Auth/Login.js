import React from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import FormErrorMessage from './FormErrorMessage';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (field) => (event) => {
    this.setState({ [field]: event.target.value, error: '' });
  };

  onSubmitLogin = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Please fill in both fields.' });
      return;
    }

    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.setState({ email: '', password: '', error: '' });
        } else {
          this.setState({ error: 'Invalid credentials.' });
        }
      })
      .catch(() => this.setState({ error: 'Server error. Please try again.' }));
  };

  render() {
    const { onRouteChange } = this.props;
    const { email, password, error } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Login</legend>
              <TextInput id="email" label="Email" type="email" value={email} onChange={this.handleChange('email')} />
              <PasswordInput id="password" value={password} onChange={this.handleChange('password')} />
              <FormErrorMessage message={error} />
            </fieldset>
            <div className="mt3">
              <input
                onClick={this.onSubmitLogin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Login"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Login;
