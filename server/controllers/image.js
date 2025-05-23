const Clarifai = require('clarifai');

// Initialize Clarifai app with your API key
const clarifaiApp = new Clarifai.App({
  apiKey: `${process.env.CLARIFAI_API_KEY}`
});

const handleApiCall = async (req, res) => {
  const { input } = req.body;

  try {
    const response = await clarifaiApp.models.predict('color-recognition', input);
    res.json(response);
  } catch (err) {
    console.error('Clarifai API error:', err);
    res.status(400).json('Unable to work with API');
  }
};

const handleEntriesCount = (db) => async (req, res) => {
  const { id } = req.body;

  try {
    const entries = await db('users')
      .where({ id })
      .increment('entries', 1)
      .returning('entries');

    res.json(entries[0].entries);
  } catch (err) {
    console.error('Error fetching entries:', error);
    res.status(500).json('Internal server error');
  }
};

module.exports = {
  handleApiCall,
  handleEntriesCount
};
