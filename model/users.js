const mongoose = require('mongoose')
const userSchema = require('../schema/users')

//model的name不会区分大小写。但是mongo要区分大小写。所以最好mongo的collection用小写，不然会查询不到数据
module.exports = mongoose.model('users',userSchema);