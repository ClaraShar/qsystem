let util = require('./util')
let quesModel = require('../../model/questionnaires')

function createQues(req, res){
    const form = {};
    if(req.query.author) form.author = req.query.author;
    if(req.query.title) form.title = req.query.title;
    if(req.query.time) form.time = req.query.time;
    if(req.query.ask_list) form.ask_list = req.query.ask_list;

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