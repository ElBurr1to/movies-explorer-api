const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsersMovies,
  createMovie,
  deleteMovie,
} = require('../../controllers/movies');

const urlRegexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

router.get('/', getUsersMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3).max(30),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required().min(1).max(1000),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().regex(urlRegexp),
    trailerLink: Joi.string().required().regex(urlRegexp),
    thumbnail: Joi.string().required().regex(urlRegexp),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    movieId: Joi.string().required().hex().length(24),
  }),
}), createMovie);

module.exports = router;
