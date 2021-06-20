var express = require('express')

module.exports = function(app){

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
    app.get('/api/changePwd',require('./changePwd'))

    //新建问卷页面
    app.post('/api/create',require('./create'))

    //申请编辑页面
    app.get('/api/edit',require('./edit'))

    //编辑提交页面
    app.post('/api/edit/submit',require('./submit'))
}