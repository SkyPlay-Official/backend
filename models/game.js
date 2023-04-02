const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date
  }
});

module.exports = Game = mongoose.model('Game', GameSchema);
