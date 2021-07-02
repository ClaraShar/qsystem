let util = require('./util')
let userModel = require('../../model/users')

function forgetPassword(req, res){
    const form = {};
    if(req.body.user) form.user = req.body.user;
    if(req.body.verification) form.verification = req.body.verification;
    if(req.body.newPwd) form.newPwd = req.body.newPwd;
    
    new Promise((resolve, reject) => {
        userModel  
            .find({username: form.user})
            .then(result => {
                console.log(result[0]);
                let responseData = { data: {} }
                //查无此人
                if(!result[0]){
                    util.responseClient(res, 200, 0, '查无此人', responseData)
                    return;
                }
                //验证码
                if(result[0].verification != form.verification){
                    util.responseClient(res, 200, 2, '验证失败', responseData)
                }
                resolve(form);
            })
        }).then(form => {
            //数据库更改
            userModel
            .findOneAndUpdate({username:form.user},{$set:{password:form.newPwd}})
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

module.exports = forgetPassword