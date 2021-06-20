let util = require('./util')
let quesModel = require('../../model/questionnaires')

function manageQues(req, res){
    var username = req.query.user;
    
    new Promise((resolve, reject) => {
        quesModel
            .find({author : username})
            .then(result => {
                let responseData = { data: {} }
                responseData.data = result;
                console.log(responseData)
                util.responseClient(res, 200, 1, 'success', responseData)
            })
        }).catch((err) => {
            console.log(err);
    })
}

module.exports = manageQues