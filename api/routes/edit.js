let util = require('./util')
let quesModel = require('../../model/questionnaires')

function editQues(req, res){
    var Qid = req.query.qid;
    
    new Promise((resolve, reject) => {
        quesModel
            .findOne({qid:Qid})
            .then(result => {
                let responseData = { data: {} }
                responseData.data = result;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = editQues