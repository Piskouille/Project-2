const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteModel = new Schema({
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
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
})

const Note = mongoose.model('note', noteModel)

module.exports = Note