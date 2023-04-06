const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;
