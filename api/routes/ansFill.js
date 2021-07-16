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
    const state={};
    //state.flag=1;
    if(req.body.username) form.username = req.body.username;
    if(req.body.qid) form.qid = req.body.qid;
    //console.log(1);
    if(req.body.ans_list) form.ans_list=req.body.ans_list;
     var t=new Date().getTime();
 // var t= Date.now();
  //t.toLocaleString( );
   console.log(t);
   form.ans_time=req.body.ans_time;



quesModel.find({qid:form.qid}).then(result=>
    {//var t0,status; console.log(1)
        state.t0=result[0].time;
        state.status=result[0].status;
        //state.console.log(t0);
        console.log(state)
        if(t<state.t0) 
        {
        let promise1= new Promise((resolve, reject) => {
        
            //console.log(state)
           
                ansModel  
                .find({}).sort({ans_qid: -1})
                .then(result => {
                    console.log(result[0]);
                    form.ans_qid = result[0].ans_qid + 1;
                    resolve(form);
                })
            
                }).then(form=>
                    {
                        if(state.status==2)
                        {
                            let responseData = { data1: {},data2:{} }
                            util.responseClient(res, 200, 2, '问卷已过期', responseData)
                        }
                        else
                       // console.log(total);
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
                      
             if(state.status==2)
             {
                 let responseData = { data1: {},data2:{} }
                 util.responseClient(res, 200, 2, '问卷已过期', responseData)
             }
             else
                        quesModel.findOneAndUpdate(
                            { qid: form.qid },
                            { $inc:{ total: +1 } }).then((doc)=> {
                               // let responseData = { data1: {},data2:{} }
                                //responseData.data1 = doc;
                                //console.log(responseData)
                                //util.responseClient(res, 200, 1, 'success', responseData)
                            })
                        
        });
        
        Promise.all([promise1,promise2]).then(function(){
        
            
        });
        }
        else
        {
            quesModel.findOneAndUpdate(
                { qid: form.qid },
                { $set:{ status: 2 } }).then((doc)=> {
                   let responseData = { data1: {},data2:{} }
                    //responseData.data1 = doc;
                    //console.log(responseData)
                    util.responseClient(res, 200, 2, '过期', responseData)
                })
        }
})

}
module.exports = ansFill
