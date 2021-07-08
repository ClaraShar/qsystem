let util = require('../util')
let quesModel = require('../../../model/questionnaires')

function checkQues(req, res){
    const form = {};
    
    if(req.body.qid) form.qid = req.body.qid;
   // console.log(1);
   // if(req.body.type) form.type=req.body.type;
   console.log(form.qid);

   let promise0 = new Promise((resolve, reject) => {
    quesModel.find({ qid:form.qid}).then(result=>{

        let responseData = {data:{}}
        if(!result[0])
        util.responseClient(res, 200, 0, 'not exists', responseData)

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

    quesModel.find({qid:form.qid}).then(result =>
        {
           
           
          var cnt1=0,cnt2=0,cnt3=0,cnt=0;
          let j=0;
          console.log(result);
               while(result[0].ask_list[j]){
                   console.log(3);let k=0; 
                 
              if(result[0].ask_list[j].type==1)
                   cnt1+=1;
              if(result[0].ask_list[j].type==2)
                   cnt2+=1;   
              if(result[0].ask_list[j].type==3)
                   cnt3+=1; 
               j++; 
           }
              
           
           
           
        form.cnt1=cnt1;
        form.cnt2=cnt2;
        form.cnt3=cnt3;
        form.cnt=cnt1+cnt2+cnt3;
        console.log(form.cnt1);
      resolve();
   })
});



    Promise.all([promise0,promise1]).then(function()
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
