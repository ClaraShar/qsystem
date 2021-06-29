var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var { createProxyMiddleware } = require('http-proxy-middleware')
var app = express();

var options = {
  target: "http://localhost:3033"
}

var proxyServer = createProxyMiddleware(options);
app.get('/fie', (req, res) => {
  res.send('hello fie')
});

app.use('/api',proxyServer)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称一致
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 设置静态文件托管
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;