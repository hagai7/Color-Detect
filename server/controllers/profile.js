const handleProfileGet = async (req, res, db) => {
  const { id } = req.params;

  try {
    const user = await db.select('*').from('users').where({ id }).first();

    if (user) {
      res.json(user);
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json('Internal server error');
  }
};

module.exports = {
  handleProfileGet
};
