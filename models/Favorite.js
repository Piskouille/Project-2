const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteModel = new Schema({
    user: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        required: true
    },
    restaurant: {
        type: {
            type : Schema.Types.ObjectId,
            ref: 'restaurant'
        },
        required: true
    }
})

const Favorite = mongoose.model('favorite', favoriteModel)

module.exports = Favorite