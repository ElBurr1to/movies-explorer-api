const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: [3, 'Минимальная длина поля "country" - 3 символа'],
    maxlength: [30, 'Максимальная длина поля "country" - 30 символа'],
    required: [true, 'Поле "country" обязательно'],
  },
  director: {
    type: String,
    minlength: [2, 'Минимальная длина поля "director" - 3 символа'],
    maxlength: [50, 'Максимальная длина поля "director" - 50 символа'],
    required: [true, 'Поле "director" обязательно'],
  },
  duration: {
    type: Number,
    min: [1, 'Минимальное значение поля "duration" - 1 минута'],
    max: [1000, 'Максимальная значение поля "duration" - 1000 минут'],
    required: [true, 'Поле "duration" обязательно'],
  },
  year: {
    type: String,
    minlength: [4, 'Минимальная длина поля "year" - 4 символа'],
    maxlength: [4, 'Максимальная длина поля "year" - 4 символа'],
    required: [true, 'Поле "year" обязательно'],
  },
  description: {
    type: String,
    minlength: [2, 'Минимальная длина поля "description" - 2 символа'],
    maxlength: [1000, 'Максимальная длина поля "description" - 1000 символа'],
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
    minlength: [2, 'Минимальная длина поля "nameRU " - 2 символа'],
    maxlength: [100, 'Максимальная длина поля "nameRU " - 1000 символа'],
    required: [true, 'Поле "nameRU " обязательно'],
  },
  nameEN: {
    type: String,
    minlength: [2, 'Минимальная длина поля "nameEN" - 2 символа'],
    maxlength: [100, 'Максимальная длина поля "nameEN" - 1000 символа'],
    required: [true, 'Поле "nameEN" обязательно'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
