import React, { useState } from 'react';
import ColorDisplay from './components/ColorDisplay/ColorDisplay';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
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
};

const App = () => {
  const [input, setInput] = useState(initialState.input);
  const [imageUrl, setImageUrl] = useState(initialState.imageUrl);
  const [colors, setColors] = useState(initialState.colors);
  const [route, setRoute] = useState(initialState.route);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [user, setUser] = useState(initialState.user);

  // Helper function to extract color information from API response
  const getColorsFromResponse = (data) => {
    const rawColors = data.outputs[0].data.colors;
    return rawColors.map(color => ({
      hex: color.raw_hex,
      name: color.w3c.name
    }));
  };

  // Function to load a user after login or signup
  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
    // Reset other app states on user load
    setInput('');
    setImageUrl('');
    setColors([]);
  };

  // Handler for input change events
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handler for submitting the image URL
  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/entries', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              // Update the entries count for the current user
              setUser(prevUser => ({
                ...prevUser,
                entries: count
              }));
            })
            .catch(console.log);
        }
        const parsedColors = getColorsFromResponse(response);
        setColors(parsedColors);
      })
      .catch(err => console.log(err));
  };

  // Handler for route changes
  const onRouteChange = (newRoute) => {
    if (newRoute === 'logout') {
      // Reset state on logout
      setInput(initialState.input);
      setImageUrl(initialState.imageUrl);
      setColors(initialState.colors);
      setRoute(initialState.route);
      setIsLoggedIn(initialState.isLoggedIn);
      setUser(initialState.user);
    } else if (newRoute === 'home') {
      setIsLoggedIn(true);
    }
    setRoute(newRoute);
  };

  // Main render (returning JSX)
  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ? (
          <div>
            <AppLogo />
            <EntryCount
              name={user.name}
              entries={user.entries}
            />
            <ColorInputForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <ColorDisplay colors={colors} imageUrl={imageUrl} />
          </div>
        ) : (
          route === 'login'
            ? <Login loadUser={loadUser} onRouteChange={onRouteChange} />
            : <SignUp loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
};

export default App;
