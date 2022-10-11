// express imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// const variables
require('dotenv').config();
const sequelize = require('./database/database');

// routers
const indexRouter = require('./routes/index.routes');
const facilitiesRouter = require('./routes/facilities.routes');

// app
const app = express();
console.log('Express is running');

// view engine setup
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//database connection
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

// routes
app.use('/', indexRouter);
app.use('/facilities', facilitiesRouter);
app.use(function (req, res, next) {
	res.status(404).send({
		code: 404,
		message: 'Not found',
	});
});

module.exports = app;
