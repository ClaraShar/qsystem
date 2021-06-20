let util = require('./util')
let userModel = require('../../model/users')

function changePassword(req, res){
    const form = {};
    if(req.query.user) form.user = req.query.user;
    if(req.query.originPwd) form.originPwd = req.query.originPwd;
    if(req.query.newPwd) form.newPwd = req.query.newPwd;
    
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
                //验证旧密码
                if(result[0].password != form.originPwd){
                    util.responseClient(res, 200, 2, '密码错误', responseData)
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

module.exports = changePassword