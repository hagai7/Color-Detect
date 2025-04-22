import React from 'react';
import Tilt from 'react-parallax-tilt';
import colorPalette from './color-palette.png';
import './AppLogo.css';

const AppLogo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2" style={{ height: 100, width: 100 }}>
        <div className="Tilt-inner pa3">
          <img alt='logo' src={colorPalette} />
        </div>
      </Tilt>
    </div>
  );
};

export default AppLogo;
