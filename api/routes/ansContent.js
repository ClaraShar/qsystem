let util =require('../util')
let ansModel=require('../../../model/answers')
let quesModel=require('../../../model/questionnaires')

function checkAnsContent(req,res)
{
var Qid =req.body.qid;

new Promise((resolve, reject) => {
    ansModel
        .find({qid:Qid})
        .then(result => {
            let responseData = {data:{} }
          
            responseData=result;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        })
    }).catch((err) => {
        console.log(err);
}) 
}

module.exports = checkAnsContent