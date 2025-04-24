import React from 'react';
import './ColorDisplay.css';  // Update the CSS filename

const ColorDisplay = ({ imageUrl, colors }) => {
  return (
    <div className='center ma'>
      {/* Image Container */}
      <div className='image-container'>
        <img id='inputimage' alt='' src={imageUrl || null}  />
      </div>

      {/* Color Swatches */}
      <div className='color-swatches'>
        {colors.map((color, index) => (
          <div key={index} className='swatch' style={{ backgroundColor: color.hex }}>
            <span className='swatch-label'>{color.name || color.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorDisplay;
