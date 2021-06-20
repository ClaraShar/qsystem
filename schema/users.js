const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	"username" :String,//用户名，唯一
	"password" : String,//密码
	"verification" : Number,//手机号后四位，忘记密码时做验证用
})