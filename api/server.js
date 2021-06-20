// 应用程序的启动入口文件
var express = require('express')
var mongoose = require('mongoose')
var routers = require('./routes/index')
const app = new express()
var bluebird = require('bluebird')

routers(app)

var dbPort = '27017'
var dbHost = 'localhost'
var port = 3033

mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://${dbHost}:${dbPort}/qsystem`, function (err) {
    if (err) {
        console.log(err, '数据库连接失败');
        return;
    }
    console.log("数据库连接成功")
    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at 127.0.0.1:${port}`)
        }
    });
})

mongoose.set("debug",true)