let util = require('../util')
let quesModel = require('../../../model/questionnaires')
let ansModel=require('../../../model/answers');
const { callbackify } = require('util');


function checkQues(req, res){
    const form = {};
    
    if(req.body.qid) form.qid = req.body.qid;
   // console.log(1);
   // if(req.body.type) form.type=req.body.type;
   console.log(form.qid);

   let promise0 = new Promise((resolve, reject) => {
    quesModel.find({ qid:form.qid}).then(result=>{
form.author=result[0].author;
form.title=result[0].title;
form.status=result[0].status;
form.total=result[0].total;
form.start_time=result[0].start_time;
form.time=result[0].time;
    }) 
             resolve();
         });


let promise1=new Promise((resolve, reject) => {

    quesModel.find({qid:form.qid, 'ask_list.type':1}).count(function (err, result1) {
        if (err) {
            reject();
        }
        form.cnt1 = result1;
        console.log(form.cnt1);
       resolve();
    })
});

let promise2=new Promise((resolve, reject) => {
    quesModel.find({qid:form.qid, 'ask_list.type':2}).count(function (err, result2) {
        if (err) {
            reject();
        }
        form.cnt2 = result2;
        console.log(form.cnt2);
        resolve();
    })

});

let promise3=new Promise((resolve, reject) => {
    
   
    quesModel.find({qid:form.qid, 'ask_list.type':3}).count(function (err, result3) {
        if (err) {
            reject();
        }
        form.cnt3 = result3;
        console.log(form.cnt3);
        form.cnt=form.cnt2+form.cnt3+form.cnt1;
        resolve();
    })


    });


    Promise.all([promise1,promise2,promise3]).then(function()
    {
            let responseData = {data:{}}
            responseData.data=form;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);
})
}
     
module.exports = checkQues
