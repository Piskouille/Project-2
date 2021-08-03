const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
  },
  isAdmin: Boolean,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  googleId: String,
  slackId: String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
