let util = require('./util')
let quesModel = require('../../model/questionnaires')
let ansModel=require('../../model/answers')


function fill(req, res){
    const form = {};
    
    if(req.body.qid) form.qid = req.body.qid;
   // console.log(1);
    
   console.log(form.qid);
    new Promise((resolve, reject) => {
        quesModel  
            .find({qid:form.qid})
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

module.exports = fill
