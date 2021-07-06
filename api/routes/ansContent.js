let util =require('../util')
let ansModel=require('../../../model/answers')
let quesModel=require('../../../model/questionnaires')

function checkAnsContent(req,res)
{
var Qid =req.body.qid;
var Ans_Qid =req.body.ans_qid;
var out1={},out2={};
let promise1=new Promise((resolve, reject) => {
    ansModel
        .find({ans_qid:Ans_Qid})
        .then(result => {
           
          out1=result;
          resolve();
        })
    }).catch((err) => {
        console.log(err);
})

let promise2=new Promise((resolve, reject) => {
    quesModel
        .find({qid:Qid})
        .then(result => {
            out2=result;
            resolve();
        })
    }).catch((err) => {
        console.log(err);
})

Promise.all([promise1,promise2]).then(function()
    {
           let responseData = {data1:{},data2:{}}
            responseData.data1=out1;
            responseData.data2=out2;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);


})
}
module.exports = checkAnsContent
