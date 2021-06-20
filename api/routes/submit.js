let util = require('./util')
let quesModel = require('../../model/questionnaires')

function submitQues(req, res){
    const form = {};
    if(req.query.qid) form.qid = req.query.qid;
    if(req.query.title) form.title = req.query.title;
    if(req.query.time) form.time = req.query.time;
    if(req.query.ask_list) form.ask_list = req.query.ask_list;

    
    new Promise((resolve, reject) => {
        quesModel  
            .findOneAndUpdate({qid:form.qid},{$set:{title:form.title, time:form.time, ask_list:form.ask_list}})
            .then(result => {
                console.log(result);
                let responseData = { data: {} }
                if(!result){
                    util.responseClient(res, 200, 1, '更新失败', responseData)
                    return;
                }
                util.responseClient(res, 200, 0, '更新成功', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = submitQues