require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const ValidationError = require('../errors/ValidationError');

const { JWT_SECRET, NODE_ENV } = process.env;

function createUser(req, res, next) {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      password: hash,
      email,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) next(new AlreadyExistsError('Пользователь с таким email уже существует'));
      else if (err.name === 'ValidationError') next(new ValidationError('Некорректные данные в запросе'));
      else next(err);
    });
}

function getSelf(req, res, next) {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(new NotFoundError('Указанный Id пользователя не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Указанный Id пользователя не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) next(new AlreadyExistsError('Этот email уже занят'));
      else if (err.name === 'ValidationError') next(new ValidationError('Некорректные данные в запросе'));
      else next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');

      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch(next);
}

function logout(req, res) {
  res
    .clearCookie('token')
    .send();
}

module.exports = {
  createUser,
  updateProfile,
  login,
  getSelf,
  logout,
};
