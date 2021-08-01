const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
   name: {
       type: String,
       unique: true,
       required: true,
       maxlength: 255
   },
   email: {
       type: String,
       unique: true,
       required: true,
       maxlength: 255
   },
   password: {
       type: String,
       required: true,
       minlength: 8,
       maxlength: 255
   },
   isAdmin: Boolean,
   following: {
       type: [Schema.Types.ObjectId],
       ref: 'user'
   },
})

const User = mongoose.model('user', userModel)

module.exports = User