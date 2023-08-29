require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { PORT, NODE_ENV, BD_ADDRESS } = process.env;

const app = express();
mongoose.connect(NODE_ENV === 'production' ? BD_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb', {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['https://elburrito.films.nomoredomainsicu.ru'],
}));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use('/', router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`Running on port: ${PORT}`);
});
