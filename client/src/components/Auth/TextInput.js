
const TextInput = ({ label, id, type = 'text', value, onChange }) => (
  <div className="mt3">
    <label className="db fw6 lh-copy f6" htmlFor={id}>{label}</label>
    <input
      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      type={type}
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default TextInput;
