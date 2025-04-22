import React, { Component } from 'react';
import ColorDisplay from './components/ColorDisplay/ColorDisplay';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Input/Login';
import SignUp from './components/Input/SignUp';
import AppLogo from './components/AppLogo/AppLogo';
import ColorInputForm from './components/ColorInputForm/ColorInputForm';
import EntryCount from './components/EntryCount/EntryCount';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  colors: [],
  route: 'login',
  isLoggedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  getColorsFromResponse = (data) => {
    const rawColors = data.outputs[0].data.colors;
    return rawColors.map(color => ({
      hex: color.raw_hex,
      name: color.w3c.name
    }));
  }
  
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      },
      input: '',
      imageUrl: '',
      colors: []
    });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        const colors = this.getColorsFromResponse(response);
        this.setState({ colors });
      
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'logout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isLoggedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isLoggedIn: isLoggedIn, imageUrl, route } = this.state;
    return (
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <AppLogo />
              <EntryCount
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ColorInputForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
            <ColorDisplay colors={this.state.colors} imageUrl={imageUrl} />
            </div>
          : (
             route === 'login'
             ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
