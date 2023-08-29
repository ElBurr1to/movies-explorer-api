const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../../controllers/users');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegexp),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = router;
