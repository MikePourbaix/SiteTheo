const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('dotenv').config();


hbs.registerHelper('exists', function (variable, options) {
  return typeof variable !== 'undefined' ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

// ROUTERS
const indexRouter = require("./routes/index.js");
const infosRouter = require('./routes/infos.js');
const servicesRouter = require('./routes/services.js');
const ressourcesRouter = require('./routes/ressources.js');
//

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// APP ROUTES
app.use('/', indexRouter);
app.use('/infos', infosRouter);
app.use('/services', servicesRouter);
app.use('/ressources', ressourcesRouter);

//

app.use((req, res, next) => next(createError(404)));

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

app.listen(port, () => console.log('App listening on : http://localhost:' + port));
