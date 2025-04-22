import React from 'react';
import './ColorInputForm.css';

const ColorInputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This tool detects the main colors in your image. Paste a URL and click Detect!'}
      </p>
      <div className='form-container'>
        <div className='form-card'>
          <input
            className='form-input'
            type='text'
            placeholder='Paste image URL here...'
            onChange={onInputChange}
          />
          <button className='form-button' onClick={onButtonSubmit}>
            Detect Colors
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorInputForm;
