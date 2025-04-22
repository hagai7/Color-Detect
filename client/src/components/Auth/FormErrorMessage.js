import React from 'react';

const FormErrorMessage = ({ message }) =>
  message ? (
    <div className="mt3" style={{
      color: '#ff3333',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '1rem',
      backgroundColor: '#2b2b2b',
      padding: '0.5rem',
      borderRadius: '0.25rem'
    }}>
      {message}
    </div>
  ) : null;

export default FormErrorMessage;
