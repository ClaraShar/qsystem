let util =require('../util')
let ansModel=require('../../../model/answers')
let quesModel=require('../../../model/questionnaires')
function checkText(req,res)
{
var Qid =req.body.qid;
var Aid=req.body.aid;
const form={
    qid:Qid,
    ans_list:[
        {}
    ]
}
new Promise((resolve, reject) => {

    ansModel
        .find({qid:Qid,'ans_list.ans_aid':Aid})
        .then(result => {
            const out={};
            let responseData = {data:{}}
         out.ans_qid=result[0].ans_qid;
          out.ans_time=result[0].ans_time;
         out.ans=result[0].ans_list.ans;
            responseData.data=result;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        })
    }).catch((err) => {
        console.log(err);
});

/*let promise2 =new Promise((resolve, reject) => {
    ansModel
        .find({qid:Qid,ans_aid:Aid})
        .then(result => {
           
          
            responseData.data2=result;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        })
    }).catch((err) => {
        console.log(err);
});*/


}

module.exports = checkText
