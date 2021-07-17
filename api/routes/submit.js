let util = require('./util')
let quesModel = require('../../model/questionnaires')

function submitQues(req, res){
    const form = {};
    if(req.body.qid) form.qid = req.body.qid;
    if(req.body.title) form.title = req.body.title;
    if(req.body.time) form.time = req.body.time;
    if(req.body.ask_list) form.ask_list = req.body.ask_list;
    if(req.body.start_time) form.start_time = req.body.start_time;
    form.status = 1;
    
    new Promise((resolve, reject) => {
        quesModel  
            .findOneAndUpdate({qid:form.qid},{$set:{title:form.title, time:form.time, ask_list:form.ask_list}})
            .then(result => {
                console.log(result);
                let responseData = { data: {} }
                if(!result){
                    util.responseClient(res, 200, 0, '更新失败', responseData)
                    return;
                }
                util.responseClient(res, 200, 1, '更新成功', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = submitQues