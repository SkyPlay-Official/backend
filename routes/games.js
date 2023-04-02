const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all games
router.get('/', (req, res) => {
  Game.find()
    .then((games) => res.json(games))
    .catch((err) => res.status(400).json({ message: 'Error fetching games' }));
});

// Get a single game by ID
router.get('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json({ message: 'Error fetching game' }));
});

// Add a new game
router.post('/', (req, res) => {
  const newGame = new Game({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    releaseDate: req.body.releaseDate
  });

  newGame.save()
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json({ message: 'Error adding game' }));
});

// Update a game
router.put('/:id', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((game) => res.json(game))
      .catch((err) => res.status(400).json({ message: 'Error updating game' }));
  });
  
  // Delete a game
  router.delete('/:id', (req, res) => {
    Game.findByIdAndRemove(req.params.id)
      .then((game) => res.json({ message: 'Game deleted' }))
      .catch((err) => res.status(400).json({ message: 'Error deleting game' }));
  });
  
  module.exports = router;
  