
const NavBar = ({ onRouteChange, isLoggedIn }) => {
    if (isLoggedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('logout')} className='f3 link dim black underline pa3 pointer'>Logout</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('login')} className='f3 link dim black underline pa3 pointer'>Login</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Sign Up</p>
        </nav>
      );
    }
}

export default NavBar;