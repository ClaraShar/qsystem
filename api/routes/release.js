let util = require('./util')
let quesModel = require('../../model/questionnaires')

function releaseQues(req, res){
    var Qid = req.body.qid;
    var start = req.body.start_time;
    
    new Promise((resolve, reject) => {
        quesModel
            .findOneAndUpdate({qid:Qid},{$set:{start_time:start}})
            .then((doc) => {
                let responseData = { data: {} }
                responseData.data = doc;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
            }).catch((err) => {
                console.log(err);
            })
        })
}

module.exports = releaseQues