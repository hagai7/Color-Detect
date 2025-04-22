const Clarifai = require('clarifai');

// Initialize Clarifai app with your API key
const clarifaiApp = new Clarifai.App({
  apiKey: 'd1ff0b32f14f4896a942b004b217460d'
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

const handleImage = async (req, res, db) => {
  const { id } = req.body;

  try {
    const entries = await db('users')
      .where({ id })
      .increment('entries', 1)
      .returning('entries');

    res.json(entries[0].entries);
  } catch (err) {
    console.error('Database error:', err);
    res.status(400).json('Unable to get entries');
  }
};

module.exports = {
  handleApiCall,
  handleImage
};
