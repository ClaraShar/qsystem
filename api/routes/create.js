let util = require('./util')
let quesModel = require('../../model/questionnaires')

function createQues(req, res){
    const form = {};
    if(req.body.author) form.author = req.body.author;
    if(req.body.title) form.title = req.body.title;
    if(req.body.time) form.time = req.body.time;
    if(req.body.ask_list) form.ask_list = req.body.ask_list;

    form.qid = 0;//失败默认为0
    form.status = 0;
    form.count = 0;
    
    new Promise((resolve, reject) => {
        quesModel  
            .find({}).sort({qid: -1})
            .then(result => {
                console.log(result[0]);
                form.qid = result[0].qid + 1;
                resolve(form);
            })
        }).then(form => {
            quesModel
            .create(form)
            .then((doc) => {
                let responseData = { data: {} }
                responseData.data = doc;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = createQues