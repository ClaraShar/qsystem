const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	"qid" :Number,//问卷号，系统自动生成
	"author" : String,//创建者用户名
	"title" : String,//问卷标题
    "status": Boolean,//发布状态，0未发布，1已发布
    "total" : Number,//收集份数,每填一次+1
    "time" : String,//问卷截止时间戳,MongoDB存储时间类型数据时，都是先转换为UTC时间，然后存储到数据库中
    "ask_list" : [{
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
    },{
        //第二题
    }]
},{versionKey: false})