var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var redirector = require('redirect-rules');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Redirects
var rules = [
  { from: '/', to: 'https://www.fortum.se/privat/elavtal/flytta-elavtal' },
  {
    from: '/din-el-vid-flytt/ditt-anlaggnings-id/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/din-el-vid-flytt/ditt-anlaggnings-id',
  },
  {
    from: '/din-el-vid-flytt/vad-ar-normal-elforbrukning/',
    to:
      'https://www.fortum.se/privat/smarta-hem/energismart-hemma/elforbrukning-elanvandning',
  },
  {
    from: '/flytta-elavtal/',
    to: 'https://www.fortum.se/privat/elavtal/flytta-elavtal',
  },
  {
    from: '/checklista/',
    to: 'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad',
  },
  {
    from: '/flyttstada/spackla-vagg-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera-din-flytt/att-flytta-ihop/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flytta-ihop',
  },
  {
    from: '/din-el-vid-flytt/teckna-gasavtal/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/din-el-vid-flytt',
  },
  {
    from: '/flyttpacka-rensa-ut/flyttpacka-glas/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/flyttips/',
    to: 'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad',
  },
  {
    from: '/planera-din-flytt/att-flytta-till-hus/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flytta-till-hus',
  },
  {
    from: '/din-el-vid-flytt/elavtal-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/din-el-vid-flytt/elavtal-vid-flytt',
  },
  {
    from: '/flyttdagen/sa-packar-du-flyttbilen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/flyttpacka-rensa-ut/flyttpacka-klader/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/planera-din-flytt/flyttanmalan-och-gora-adressandring/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttanmalan',
  },
  {
    from: '/flyttstada/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera-din-flytt/rutavdrag-nar-du-flyttar/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/rutavdrag-nar-du-flyttar',
  },
  {
    from: '/planera-din-flytt/att-flytta-hemifran/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flytta-hemifran',
  },
  {
    from: '/flyttstada/att-flyttstada-sjalv-eller-anlita-stadfirma/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttstada/flyttstada-koket/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera-din-flytt/sophamtning/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/planera-din-flytt/teckna-eller-saga-upp-vatten-och-avlopp/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/flyttpacka-rensa-ut/organisera-packningen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/din-el-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/din-el-vid-flytt',
  },
  {
    from: '/flyttpacka-rensa-ut/flytta-sjalv-eller-anlita-flyttfirma/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/flyttpacka-rensa-ut/rensa-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/flyttstada/vad-ingar-i-flyttstadning/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttstada/organisera-flyttstadningen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttpacka-rensa-ut/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttstada/flyttstada-badrummet/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera-din-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/flyttpacka-rensa-ut/flyttkartonger-och-packmaterial/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/din-el-vid-flytt/fast-eller-rorligt-elavtal/',
    to:
      'https://www.fortum.se/privat/elavtal/elpriser/fast-eller-rorligt-elpris',
  },
  {
    from: '/flyttpacka-rensa-ut/flyttpacka-smart/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/flyttdagen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/flyttdagen',
  },
  {
    from: '/flyttstada/flyttstada-med-miljovanliga-rengoringsmedel/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/din-el-vid-flytt/vem-star-pa-elavtalet/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/din-el-vid-flytt',
  },
  {
    from: '/flyttstada/tvatta-fonster/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera-din-flytt/flytta-hemforsakring/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/planera-din-flytt/vad-ar-en-samfallighet/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/flyttpacka-rensa-ut/atervinn-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttdagen/kolla-upp-forsakringen-pa-hyrbil-och-slap/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/flyttdagen',
  },
  {
    from: '/planera-din-flytt/ledighet-vid-flytt/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/din-el-vid-flytt/sa-fungerar-elmarknaden/',
    to:
      'https://www.fortum.se/privat/elavtal/elpriser-och-elavtal/sa-satts-elpriset',
  },
  {
    from: '/flyttdagen/undvik-skador-under-flytten-med-ratt-lyftteknik/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/flyttdagen',
  },
  {
    from: '/flyttdagen/planera-flyttdagen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/planera-din-flytt/flytta-med-ditt-bredband/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/stada/flyttstada-badrummet/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/flyttdagen/att-organisera-flyttlasset/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
  {
    from: '/stada/organisera-flyttstadningen/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttstada',
  },
  {
    from: '/planera/flytta-hemforsakring/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt',
  },
  {
    from: '/rensa-packa/flyttkartonger-och-packmaterial/',
    to:
      'https://www.fortum.se/privat/elavtal/flytta-elavtal/tips-och-rad/planera-din-flytt/flyttpacka',
  },
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(redirector(rules));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
