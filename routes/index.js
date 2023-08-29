const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const usersRouter = require('./users/users');
const moviesRouter = require('./movies/movies');
const signinRouter = require('./signin/signin');
const signupRouter = require('./signup/signup');
const signoutRouter = require('./signout/signout');
const auth = require('../middlewares/auth');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/signout', signoutRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
