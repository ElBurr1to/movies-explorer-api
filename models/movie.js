const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" обязательно'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" обязательно'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" обязательно'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" обязательно'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" обязательно'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно'],
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" обязательно'],
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" обязательно'],
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" обязательно'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU " обязательно'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" обязательно'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
