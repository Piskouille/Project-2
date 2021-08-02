const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true,
  },
});

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = Favorite;
