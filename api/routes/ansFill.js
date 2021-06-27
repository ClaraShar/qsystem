let util = require('./util')
let quesModel = require('../../model/questionnaires')
let ansModel=require('../../model/answers')

function ansFill(req, res){
    const form = {};
    if(req.body.username) form.username = req.body.username;
    if(req.body.qid) form.qid = req.body.qid;
    console.log(1);
    if(req.body.ans_list) form.ans_list=req.body.ans_list;
  
   console.log(form.ans_list);
    new Promise((resolve, reject) => {

                resolve(form);
           
        }).then(form=>
            {
                ansModel.create(form).then((doc) => 
                {
                    let responseData = { data: {} }
                    responseData.data = doc;
                    console.log(responseData)
                    util.responseClient(res, 200, 1, 'success', responseData)
                })
            }).catch((err) => {
                console.log(err);
            })
}

module.exports = ansFill
