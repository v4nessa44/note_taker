const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
router.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))).catch(err =>{
    console.log(err)
    res.json(err)
  })
);

// POST Route for submitting feedback
router.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newFeedback = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newFeedback, './db/db.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = router;
