/*url: '/api/check/text' //查看文本题情况
method: 'post',
params: {
    qid:'',
    aid:'',//题号
}
res: {
    ans_qid:1234,//答卷号
    ans_time: '',//填写时间
   ans:'',//文本题内容

}*/
let util =require('../util')
let ansModel=require('../../../model/answers')

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
        .find({qid:Qid,'ans_list.ans_aid':Aid},{ans_qid:1,'ans_list.ans_aid':1,'ans_list.ans':1,ans_time:1})
        .then(result => {
           

          let i=0,j=0; var out={};var time={};var  form={};

          while(result[i])
          {
              
              while(result[i].ans_list[j]){
              if(result[i].ans_list[j].ans_aid==Aid)
              {
                  
               result[i].ans_list[j]._doc.ans_time=result[i].ans_time;
               result[i].ans_list[j]._doc.ans_qid=result[i].ans_qid;
               console.log( result[i].ans_list[j]);   
               out[i]=result[i].ans_list[j]; time[i]=result[i].ans_time;
                  form[i]=out[i]+",ans_time:"+"'"+time[i]+"'";
                 
              }
              
              j++;
            }
            i++;j=0;
          }
         


            let responseData = {data:{}}
            
            responseData.data=out;
            console.log(result[1].ans_list)
            if(result[0])
            util.responseClient(res, 200, 1, 'success', responseData)
            else
            util.responseClient(res, 200, 0, 'not exists', responseData)
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
