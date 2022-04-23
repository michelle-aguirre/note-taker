const router = require('express').Router();
const store = require('../db/store');

// POST request to add a review
router.post('/notes', (req, res) => {
    // Log that a POST request was received
    store
    .addNote(req.body)
    .then((note)=> res.json(note))
    .catch((err)=> res.status(500).json(err));
});
router.get('/notes', (req, res) => {
    // Log that a POST request was received
    store
    .getNotes()
    .then((notes)=> {return res.json(notes);
    })
    .catch((err)=> res.status(500).json(err));
});
