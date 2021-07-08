const mongoose = require('mongoose')

const ask_list = new mongoose.Schema({
    //第一题
    "aid" : Number,//题号
    "type" : Number,//题型，1 单选；2 多选；3 问答
    "isNecessary" : Boolean,//是否必填项
    "ask" : String,//题目
    "ans" : String,//问答内容，可为空
    "choice_list" : [{//选项列表
        //A项
        "cid" : Number,//选项编号（A，B，C）
        "content" : String,//选项内容
        "count" : Number,//被选次数，初始为0，每选一次+1
    },{
        //B项
    }]
})

module.exports = new mongoose.Schema({
	"qid" : Number,//问卷号，系统自动生成
	"author" : String,//创建者用户名
	"title" : String,//问卷标题
    "status": Number,//发布状态，0未发布，1发布中,2已结束
    "total" : Number,//收集份数,每填一次+1
    "start_time" : String,//问卷发布时间戳
    "time" : String,//问卷截止时间戳
    "ask_list" : [ask_list]
},{versionKey: false})
