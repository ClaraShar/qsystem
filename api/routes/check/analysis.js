let util = require('../util')
let quesModel = require('../../../model/questionnaires')
let ansModel=require('../../../model/answers');
const { callbackify } = require('util');


const ch=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];



function analysis(req, res){
    const form = {};
   // console.log(ch[2])
    if(req.body.qid) form.qid = req.query.qid;
    //form.ans_qid=req.body.ans_qid;
   // console.log(1);
   // if(req.body.type) form.type=req.body.type;
   console.log(form.qid);
var numofchoice=0;
var t=new Date().getTime();
console.log(t);



   let promise0 = new Promise((resolve, reject) => {
    quesModel.find({ qid:form.qid}).then(result=>{
        let responseData = {data:{}}
        if(!result[0])
        util.responseClient(res, 200, 0, 'not exists', responseData)
form.author=result[0].author;
form.title=result[0].title;
form.total=result[0].total;
form.status=result[0].status;
form.start_time=result[0].start_time;
form.time=result[0].time;
if(t> parseInt(result[0].time))
{
    //parseInt(result[0].time);
    console.log(result[0].time)
    form.status=2;
    quesModel.findOneAndUpdate(
        { qid: form.qid },
        { $set:{ status: 2 } }).then((doc)=> {
          
        })
}

let i=0;while(result[i])
{
    let j=0;while(result[i].ask_list[j])
    {
        
        if(numofchoice<result[i].ask_list[j].choice_list.length)
        numofchoice=result[i].ask_list[j].choice_list.length;
       // console.log(numofchoice);    
        j++;
        
    }
    i++;
}
    }) 
    //console.log(numofchoice);        
    resolve();
         });


//统计每一题的x选数量
let promise1=new Promise((resolve, reject) => {

    ansModel.find({qid:form.qid}).then(result =>
         {
            //console.log(numofchoice); 
              var cnt=[];
            for (let i=0;i<numofchoice;i++)
            {
                cnt[i]=[];
                //console.log(cnt[i])
            }


           
            
        //console.log(numofchoice)
            {let x=0;while(x<numofchoice)
            {
                {
                    let i=0;
                      while(result[i])
                      {
                     let j=0; 
                          while(result[i].ans_list[j])
                          {
                             cnt[x][j]=0;
                             j++; 
                             }
                 i++
                      } 
             }  x++;   }
            }
             {let x=0;while(x<numofchoice){
            let i=0;//var cnt1={};cnt1[0]=0;cnt1[1]=0;
            while(result[i])
            {
                let j=0; 
                while(result[i].ans_list[j]){
                    //console.log(3);
                    let k=0; 
                    while( result[i].ans_list[j].choice[k])
                    {
                if( ch[x] == result[i].ans_list[j].choice[k] )
                {
                   
                   // console.log(cnt[x][j]);
                    cnt[x][j]+=1;
                   // console.log(cnt[x][j]);
                }k++;
            }
                j++; 
            }
             i++
            }
x++;
}

}
    form.cnt=cnt;

       
       resolve();
    })
      
       

});


   let promise2=new Promise((resolve, reject) => {

        ansModel.find({qid:form.qid,'ans_list.choice':{$exists:true}}).then(result =>
             {
                 //按照题目数初始化cnt为零
                 {
                    let i=0;var count={};
                     while(result[i])
                     {
                    let j=0; 
                         while(result[i].ans_list[j])
                         {
                            count[j]=0;
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
                    
                            count[j]+=1; 
                      
                }
                j++; 
                }
                 i++
                }
             form.count=count;
             console.log(form.count);
           resolve();
        })
          
           
        
    });


   

    Promise.all([promise0,promise1,promise2]).then(function()
    {
            let responseData = {data:{}}
            responseData.data=form;
            console.log(responseData);
           // console.log(form.cnt.length);
           // console.log(form.cnt[0].length);
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);
})
}
     
module.exports = analysis
