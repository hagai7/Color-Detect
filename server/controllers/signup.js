const handleSignUp = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    const hash = bcrypt.hashSync(password);

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
    console.error('Signup error:', err);
    res.status(400).json('Unable to sign up');
  }
};

module.exports = {
  handleSignUp
};
