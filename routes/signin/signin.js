const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../../controllers/users');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegexp),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
