const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false} ));

//Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  next();
});


/*
** Routes
*/
var storeRouter = require('./controllers/storeController');
app.use('/api', storeRouter);

var orderRouter = require('./controllers/orderController');
app.use('/api', orderRouter);

var paymentRouter = require('./controllers/paymentController');
app.use('/api', paymentRouter);

/*
** Errors Management
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.json({error : err});
});

module.exports = app;
