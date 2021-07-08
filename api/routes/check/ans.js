/*url: '/api/check/ans' //查看答卷情况
method: 'post',
params: 
    qid:'',

res: {
    ans_qid:1234,//答卷号
    ans_time: '',//填写时间
  
}*/

let util =require('../util')
let ansModel=require('../../../model/answers')

function checkAns(req,res)
{
var Qid =req.body.qid;

new Promise((resolve, reject) => {
    ansModel
        .find({qid:Qid})
        .then(result => {
            
            let responseData = {data:{} }
          
            responseData=result;
            console.log(responseData)
            if(result[0])
            util.responseClient(res, 200, 1, 'success', responseData)
            else
            util.responseClient(res, 200, 0, 'not exists', responseData)
        })
    }).catch((err) => {
        console.log(err);
}) 
}

module.exports = checkAns
