const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    content: {
        type: String,
        maxlength: 1000
    },
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note