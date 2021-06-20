let util = require('./util')
let quesModel = require('../../model/questionnaires')

function deleteQues(req, res){
    var deleteList = req.body.deleteList;
    console.log(deleteList)
    
    new Promise((resolve, reject) => {
        quesModel
            .find({qid:{$in:deleteList}})
            .then(result => {
                console.log(result)
                let responseData = { data: {} }
                if(!result[0]){
                    util.responseClient(res, 200, 0, '数据库无记录', responseData);
                    //Unhandled rejection Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after
                    //在请求时出现这种问题,是因为浏览器请求一次之后，服务器却返回两次及两次以上的响应。这种容易发生在异步回调中.
                    return;
                }
                /*假设我们的函数是一个流，正常情况下是顺序执行的，但是当遇到文件io，数据库读写这类任务的时候，node会从这个流程中新建一个分支来执行.
                而主流程还在继续进行，也就是说无论如何都会走到最后一句，res.json一个成功的结果.
                若写mongodb没问题，也就不会触发err，从而触发res来返回结果，自然不会有问题.
                但如果写数据库出现err，程序就会找到主流程中的回调方法，而回调中又有一个res.json，自然是多次调用res.json导致程序崩溃。*/
                else{
                    quesModel
                    .deleteMany({qid:{$in:deleteList}})
                    .then((doc) => {
                        let responseData = { data: {} }
                        util.responseClient(res, 200, 1, '删除成功', responseData)
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        })
}

module.exports = deleteQues