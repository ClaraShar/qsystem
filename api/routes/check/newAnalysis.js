let util = require('../util')
let quesModel = require('../../../model/questionnaires')
let ansModel=require('../../../model/answers');

function analysisQues(req, res){
    var Qid = req.body.qid;
    new Promise((resolve, reject) => {
        quesModel
            .find({qid : Qid})
            .then(result => {
                var numOfQues = result[0].ask_list.length;
                var countResult = [];
                for(let i = 0; i < numOfQues; i++){
                    var numOfChoice = result[0].ask_list[i].choice_list.length//每道题的选项个数，如果为0，则是问答题
                    var obj = [];
                    for(let j = 0 ;j < numOfChoice; j++){
                        obj.push(result[0].ask_list[i].choice_list[j].count);
                    }
                    countResult.push(obj);
                }
                console.log(countResult);
                let responseData = { data: {} }
                responseData.data = countResult;
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = analysisQues