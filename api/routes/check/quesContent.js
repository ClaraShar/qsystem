let util =require('../util')
let quesModel=require('../../../model/questionnaires')

function checkQuesContent(req,res)
{
var Qid =req.body.qid;

var out={};


let promise2=new Promise((resolve, reject) => {
    quesModel
        .find({qid:Qid})
        .then(result => {

            let responseData = {data:{}}
            if(!result[0])
            util.responseClient(res, 200, 0, 'not exists', responseData)
            else
            out=result;
            resolve();
        })
    }).catch((err) => {
        console.log(err);
})

Promise.all([promise2]).then(function()
    {
           let responseData = {data:{}}
            responseData.data=out;
            
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);


})
}
module.exports = checkQuesContent