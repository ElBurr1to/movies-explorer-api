const mongoose = require('mongoose');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Movie = require('../models/movie');

function getUsersMovies(req, res, next) {
  const owner = req.user._id;

  Movie.find({ owner })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.message === 'Validation failed') next(new ValidationError('Некорректные данные в запросе'));
      else next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(movieId)) {
    return next(new ValidationError('Некорректный Id'));
  }

  return Movie.findById(movieId)
    .orFail(new NotFoundError('Указанный Id фильма не найден'))
    .populate('owner')
    .then((movie) => {
      if (movie.owner._id.valueOf() !== userId) {
        throw new NotAuthorizedError('Невозможно удалить чужой фильм');
      }

      movie
        .deleteOne()
        .then(() => {
          res.send(movie);
        });
    })
    .catch(next);
}

module.exports = {
  getUsersMovies,
  createMovie,
  deleteMovie,
};
