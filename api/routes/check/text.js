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
           

       
            let responseData = {data:{}}
            responseData.data=result;
            console.log(responseData)
            if(result[0])
            util.responseClient(res, 200, 1, 'success', responseData)
            else
            util.responseClient(res, 200, 0, 'not exists', responseData)

        })
    }).catch((err) => {
        console.log(err);
});




}

module.exports = checkText
