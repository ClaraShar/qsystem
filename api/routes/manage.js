let util = require('./util')
let quesModel = require('../../model/questionnaires')

function manageQues(req, res){
    var username = req.query.user;

    new Promise((resolve, reject) => {
        quesModel
            .find({author : username})
            .then(result => {
                var changeStatus = [];
                for(let i = 0; i < result.length; i++){
                    var timestamp = parseInt(new Date().getTime() / 1000);
                    if(result[i].status != 2 && timestamp > parseInt(result[i].time)){
                        result[i].status = 2;
                        changeStatus.push(result[i].qid)
                    }
                }
                let responseData = { data: {} }
                responseData.data = result;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
                resolve(changeStatus)
            })
        }).then( changeStatus => {
            for(let i in changeStatus){
                //数据库更改
                quesModel
                .findOneAndUpdate({qid:changeStatus[i]},{$set:{status:2}})
                .then((doc) => {
                    console.log("数据库修改成功")
                })
            }
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = manageQues