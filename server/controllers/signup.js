const handleSignUp = (db, bcrypt) => async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    // Check if the email or name already exists
    const existingEmail = await db('login').where('email', email).first();
    if (existingEmail) {
      return res.status(400).json('Email is already registered');
    }

    const existingName = await db('users').where('name', name).first();
    if (existingName) {
      return res.status(400).json('Name is already taken');
    }

    // Hash the password before saving it
    const hash = bcrypt.hashSync(password);

    // Start transaction to insert user and login details
    const newUser = await db.transaction(async trx => {
      const loginEmail = await trx('login')
        .insert({ hash, email })
        .returning('email');

      const user = await trx('users')
        .insert({
          email: loginEmail[0].email,
          name,
          joined: new Date()
        })
        .returning('*');

      return user[0];
    });

    console.log('User successfully signed up:', newUser);
    res.json(newUser);

  } catch (err) {
    console.error('Sign up error:', err);
    res.status(400).json('Unable to sign up');
  }
};

module.exports = {
  handleSignUp
};
