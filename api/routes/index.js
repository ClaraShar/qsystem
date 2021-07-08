var express = require('express')
var handlebars = require("express3-handlebars").create({ defaultLayout: "main"});

module.exports = function(app){

    app.engine("handlebars", handlebars.engine); //设置视图引擎
    app.set("view engine", "handlebars");

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    app.get('/',function(req,res){
      res.send('hello world')
    })

    //管理问卷主页面
    app.get('/api/manage',require('./manage'))

    //删除问卷
    app.post('/api/manage/delete',require('./delete'))

    //修改密码
    app.post('/api/changePwd',require('./changePwd'))

    //忘记密码
    app.post('/api/forgetPwd',require('./forgetPwd'))

    //新建问卷页面
    app.post('/api/create',require('./create'))

    //申请编辑页面
    app.get('/api/edit',require('./edit'))

    //编辑提交页面
    app.post('/api/edit/submit',require('./submit'))

    //发布问卷
    app.post('/api/release', require('./release'))

    // 测试路由
    app.get('/api/test',function(req, res){
      res.render("thank-you")
    })
}