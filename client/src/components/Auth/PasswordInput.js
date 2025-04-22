import React from 'react';

const PasswordInput = ({ id, value, onChange }) => (
  <div className="mv3">
    <label className="db fw6 lh-copy f6" htmlFor={id}>Password</label>
    <input
      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      type="password"
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default PasswordInput;
