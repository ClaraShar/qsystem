let util = require('./util')
let userModel = require('../../model/users')
let md5 = require("md5")

//用户注册
function register(req, res) {
    const  form = {};
   // console.log(req.body.user);
    if(req.body.user) form.user = req.body.user;
    console.log(form.user);
    if(req.body.pwd) form.pwd = md5(req.body.pwd);
    if(req.body.verification) form.verification = req.body.verification;

    new Promise((resolve, reject) => {
        userModel  
            .find({username: form.user})
            .then(result => {
                console.log(result[0]);
                let responseData = { data: {} }
                //查到已存在
                if(result[0]){
                    util.responseClient(res, 200, 0, '用户名已存在', responseData)
                    return;
                }
                else 
                resolve(form);
            })
        }).then(form => {
            //数据库更改
            console.log(form.user);
            userModel
            .create({username:form.user,password:form.pwd,verification:form.verification})
            //.create(form)
            .then((doc) => {
                let responseData = { data: {} }
                responseData.data = doc;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}
   
    

module.exports =register;
