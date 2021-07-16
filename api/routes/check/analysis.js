let util = require('../util')
let quesModel = require('../../../model/questionnaires')
let ansModel=require('../../../model/answers');
const { callbackify } = require('util');
const ch=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function analysis(req, res){
    const form = {};
   // console.log(ch[2])
    if(req.body.qid) form.qid = req.body.qid;
    //form.ans_qid=req.body.ans_qid;
   // console.log(1);
   // if(req.body.type) form.type=req.body.type;
   console.log(form.qid);
var numofchoice=0;

   let promise0 = new Promise((resolve, reject) => {
    quesModel.find({ qid:form.qid}).then(result=>{
        let responseData = {data:{}}
        if(!result[0])
        util.responseClient(res, 200, 0, 'not exists', responseData)
<<<<<<< HEAD
            form.author=result[0].author;
            form.title=result[0].title;
            form.status=result[0].status;
            form.total=result[0].total;
            form.start_time=result[0].start_time;
            form.time=result[0].time;
            }) 
            resolve();
        });
=======
form.author=result[0].author;
form.title=result[0].title;
form.status=result[0].status;
form.total=result[0].total;
form.start_time=result[0].start_time;
form.time=result[0].time;


let i=0;while(result[i])
{
    let j=0;while(result[i].ask_list[j])
    {
        
        if(numofchoice<result[i].ask_list[j].choice_list.length)
        numofchoice=result[i].ask_list[j].choice_list.length;
        console.log(numofchoice);    
        j++;
        
    }
    i++;
}
    }) 
    //console.log(numofchoice);        
    resolve();
         });
>>>>>>> 96a81a9c3b69cade806d4ab53e8c01f5acf3136b


//统计每一题的x选数量
let promise1=new Promise((resolve, reject) => {

    ansModel.find({qid:form.qid}).then(result =>
         {
            console.log(numofchoice);   var cnt={};
            for (let i=0;i<numofchoice;i++)
            {
                cnt[i]={};
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
                    console.log(3);let k=0; 
                    while( result[i].ans_list[j].choice[k])
                    {
                if( ch[x] == result[i].ans_list[j].choice[k] )
                {
                   
                    console.log(cnt[x][j]);
                    cnt[x][j]+=1;
                    console.log(cnt[x][j]);
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
         console.log(cnt);
       resolve();
<<<<<<< HEAD
    })    
});
=======
    })
      
       
>>>>>>> 96a81a9c3b69cade806d4ab53e8c01f5acf3136b

});

<<<<<<< HEAD
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

=======
>>>>>>> 96a81a9c3b69cade806d4ab53e8c01f5acf3136b

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
            console.log(responseData)
            util.responseClient(res, 200, 1, 'success', responseData)
            
        
    }).catch((err) => {
        console.log(err);
})
}
     
module.exports = analysis
