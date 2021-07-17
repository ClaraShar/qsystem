let util = require('./util')
let userModel = require('../../model/users')
let md5=require("md5")

function login(req, res){
    const form = {};
    if(req.body.user) form.user = req.body.user;
    if(req.body.pwd) form.pwd = md5(req.body.pwd);
    console.log(form.pwd)
    new Promise((resolve, reject) => {
        userModel  
            .find({username: form.user})
            .then(result => {
                console.log(result[0]);
                let responseData = { data: {} }
                //查询是否有
                if(!result[0]){
                    
                    util.responseClient(res, 200, 0, '无效用户名，请先注册', responseData)
                    return;
                }
                //验证旧密码
                if(result[0].password == form.pwd && result[0].username == form.user ){
                    util.responseClient(res, 200, 1, '登陆成功', responseData)
                    console.log( md5(result[0].password))
                }
                else{
                     
                    util.responseClient(res, 200, 2, '用户名或密码错误', responseData)
                }
                resolve(form);
            })
        })
}

module.exports = login
