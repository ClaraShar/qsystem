let util = require('./util')
let quesModel = require('../../model/questionnaires')

function manageQues(req, res){
    var username = req.query.user;

    new Promise((resolve, reject) => {
        quesModel
            .find({author : username})
            .then(result => {
                for(let i = 0; i < result.length; i++){
                    var timestamp=new Date().getTime();
                    if(timestamp < result[i].time){
                        
                    }
                }
                let responseData = { data: {} }
                responseData.data = result;
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = manageQues