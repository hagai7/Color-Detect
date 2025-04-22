const handleLogin = (db, bcrypt) => async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    const data = await db('login')
      .select('email', 'hash')
      .where({ email });

    if (!data.length || !bcrypt.compareSync(password, data[0].hash)) {
      return res.status(400).json('Wrong credentials');
    }

    const user = await db('users')
      .select('*')
      .where({ email });

    res.json(user[0]);

  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json('Unable to login');
  }
};

module.exports = {
  handleLogin
};
