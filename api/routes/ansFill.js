/*url: '/api/fill' //填写问卷页面
method: 'post',
params: {
    qid:'',
    ans_time: '',
    ans_list: [{
        //第一题
        ans_aid: 1,//题号
        //type: 1,//题型，1 单选；2 多选；3 问答
        isNecessary: true,//是否必填项
        ans: '',//问答内容，可为空
        choice: '',//所选选项，可为空
    },{
        //第二题
    }]
}
res: {
    ans_qid: 1234,//返回的答卷号由系统自动生成，若为0则失败

}*/

let util = require('./util')
let quesModel = require('../../model/questionnaires')
let ansModel=require('../../model/answers');
const { callbackify } = require('util');
function ansFill(req, res){
    const form = {};
    if(req.body.username) form.username = req.body.username;
    if(req.body.qid) form.qid = req.body.qid;
    //console.log(1);
    if(req.body.ans_list) form.ans_list=req.body.ans_list;
 // var t= Date.now();
  //t.toLocaleString( );
  // console.log(t);
   form.ans_time=req.body.ans_time;
 let promise1= new Promise((resolve, reject) => {

        ansModel  
        .find({}).sort({ans_qid: -1})
        .then(result => {
            console.log(result[0]);
            form.ans_qid = result[0].ans_qid + 1;
            resolve(form);
        })
           
        }).then(form=>
            {
                console.log("form.ans_list:")
                console.log(form.ans_list);
                //插入答卷表数据
               ansModel.create(form).then((doc) => 
                {
                    let responseData = { data1: {},data2:{} }
                    responseData.data2 = doc;
                    console.log(responseData)
                    util.responseClient(res, 200, 1, 'success', responseData)
                })
            }).catch((err) => {
                console.log(err);
            });

let promise2=new Promise((resolve,reject)=>
{
     //更新问卷表次数+1
    quesModel.findOneAndUpdate(
        { qid: form.qid },
        { $inc:{ total: +1 } }).then((doc)=> {
           // let responseData = { data1: {},data2:{} }
            //responseData.data1 = doc;
            //console.log(responseData)
            //util.responseClient(res, 200, 1, 'success', responseData)
        })
});

Promise.all([promise1,promise2]).then(function(){callbackify(null,data);});
}
module.exports = ansFill
