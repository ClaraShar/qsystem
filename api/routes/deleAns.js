let util = require('./util')
let quesModel = require('../../model/questionnaires')
let ansModel=require('../../model/answers');

function deleAns(req, res){
    var Ans_Qid = req.body.ans_qid;
    
    new Promise((resolve, reject) => {
        ansModel
            .findOneAndDelete({ans_qid:Ans_Qid})
            .then(result => {
                let responseData={}
                //console.log(result)
                if(result==null)
                util.responseClient(res, 200, 0, 'error', responseData)
                else
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = deleAns
