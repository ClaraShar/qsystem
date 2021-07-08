const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    "qid":Number,//问卷号，获取所答问卷生成
   // "username":String,//用户名，获取当前用户
    "ans_qid" :Number,//答卷号，系统自动生成，唯一
    //"ans_title" : String,//问卷标题
    "ans_time" : String,//填写时间
    "ans_list" : [{
        //第一题
        "ans_aid" : Number,//题号同aid
        //"type" : Number,//题型，1 单选；2 多选；3 问
       // "ask" : String,//题目
        "ans" : String,//问答内容，可为空
        "choice" :[] , //所选选项，可为空.例如：ACD =>"1,3,4"
       },{
        //第二题
    }]
},{versionKey:false})
