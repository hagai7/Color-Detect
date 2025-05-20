
const EntryCount = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`Welcome, ${name}!`}
      </div>
      <div className='white f1'>
        {`Images submitted: ${entries}`}
      </div>
    </div>
  );
}

export default EntryCount;
