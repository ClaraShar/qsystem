let util = require('../util')
let quesModel = require('../../../model/questionnaires')
let ansModel=require('../../../model/answers');
const { callbackify } = require('util');


function analysis(req, res){
    const form = {};
    
    if(req.body.qid) form.qid = req.body.qid;
    //form.ans_qid=req.body.ans_qid;
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

    ansModel.find({qid:form.qid,'ans_list.choice':"A"}).then(result =>
         {
             //按照题目数初始化cnt1为零
             {
                let i=0;var cnt1={};
                 while(result[i])
                 {
                let j=0; 
                     while(result[i].ans_list[j])
                     {
                        cnt1[j]=0;
                        j++; 
                        }
            i++
                 } 
        }
            //统计每一题的A数量
            let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
            while(result[i])
            {
                let j=0; 
                while(result[i].ans_list[j]){
                    console.log(3);let k=0; 
                    while( result[i].ans_list[j].choice[k])
                    {
                if( "A" == result[i].ans_list[j].choice[k] )
                {
                   
                    console.log(cnt1[j]);
                    cnt1[j]+=1;
                    console.log(cnt1[j]);
                }k++;
            }
                j++; 
            }
             i++
            }
         form.cnt1=cnt1;
         console.log(form.cnt1);
       resolve();
    })
      
       
    
});

let promise2=new Promise((resolve, reject) => {
    ansModel.find({qid:form.qid,'ans_list.choice':"B"}).then(result =>
        {
            //按照题目数初始化cnt1为零
            {
               let i=0;var cnt2={};
                while(result[i])
                {
               let j=0; 
                    while(result[i].ans_list[j])
                    {
                       cnt2[j]=0;
                       j++; 
                       }
           i++
                } 
       }
           //统计每一题的A数量
           let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
           while(result[i])
           {
               let j=0; 
               while(result[i].ans_list[j]){
                   console.log(3);let k=0; 
                   while( result[i].ans_list[j].choice[k])
                   {
               if( "B" == result[i].ans_list[j].choice[k] )
               {
                  
                   console.log(cnt2[j]);
                   cnt2[j]+=1;
                   console.log(cnt2[j]);
               }
               k++;
            }
               j++; 
           }
            i++
           }
        form.cnt2=cnt2;
        console.log(form.cnt2);
      resolve();
   })

});

let promise3=new Promise((resolve, reject) => {
    ansModel.find({qid:form.qid,'ans_list.choice':"C"}).then(result =>
        {
            //按照题目数初始化cnt1为零
            {
               let i=0;var cnt3={};
                while(result[i])
                {
               let j=0; 
                    while(result[i].ans_list[j])
                    {
                       cnt3[j]=0;
                       j++; 
                       }
           i++
                } 
       }
           //统计每一题的A数量
           let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
           while(result[i])
           {
               let j=0; 
               while(result[i].ans_list[j]){
                   console.log(3);let k=0; 
                   while( result[i].ans_list[j].choice[k])
                   {
               if( "C" == result[i].ans_list[j].choice[k] )
               {
                  
                   console.log(cnt3[j]);
                   cnt3[j]+=1;
                   console.log(cnt3[j]);
               }
               k++;
            }
               j++; 
           }
            i++
           }
        form.cnt3=cnt3;
        console.log(form.cnt3);
      resolve();
   })

    
});

let promise4=new Promise((resolve, reject) => {
    
   
    ansModel.find({qid:form.qid,'ans_list.choice':"D"}).then(result =>
        {
            //按照题目数初始化cnt1为零
            {
               let i=0;var cnt4={};
                while(result[i])
                {
               let j=0; 
                    while(result[i].ans_list[j])
                    {
                       cnt4[j]=0;
                       j++; 
                       }
           i++
                } 
       }
           //统计每一题的A数量
           let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
           while(result[i])
           {
               let j=0; 
               while(result[i].ans_list[j]){
                   console.log(3);let k=0; 
                   while( result[i].ans_list[j].choice[k])
                   {
               if( "D" == result[i].ans_list[j].choice[k] )
               {
                  
                   console.log(cnt4[j]);
                   cnt4[j]+=1;
                   console.log(cnt4[j]);
               }
               k++;
            }
               j++; 
           }
            i++
           }
        form.cnt4=cnt4;
        console.log(form.cnt4);
      resolve();
   })



    });


    let promise5=new Promise((resolve, reject) => {

        ansModel.find({qid:form.qid,'ans_list.choice':{$exists:true}}).then(result =>
             {
                 //按照题目数初始化cnt为零
                 {
                    let i=0;var cnt={};
                     while(result[i])
                     {
                    let j=0; 
                         while(result[i].ans_list[j])
                         {
                            cnt[j]=0;
                            j++; 
                            }
                i++
                     } 
            }
                //统计每一题dati数量
                let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
                while(result[i])
                {
                    let j=0; 
                    while(result[i].ans_list[j]){
                        console.log(3);let k=0; 
                        if( result[i].ans_list[j].choice[k])
                        {
                    
                       cnt[j]+=1; 
                      
                }
                j++; 
                }
                 i++
                }
             form.cnt=cnt;
             console.log(form.cnt);
           resolve();
        })
          
           
        
    });


    Promise.all([promise0,promise1,promise2,promise3,promise4,promise5]).then(function()
    {
            let responseData = {data:{}}
            responseData.data=form;
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);
})
}
     
module.exports = analysis
