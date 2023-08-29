const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateProfile,
  getSelf,
} = require('../../controllers/users');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

router.get('/me', getSelf);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(emailRegexp),
  }),
}), updateProfile);

module.exports = router;
