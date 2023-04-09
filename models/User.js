const { Schema, model } = require('mongoose');

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

userSchema.pre('find', function (next) {
  this.populate('thoughts friends');
  next();
});

const User = model('User', userSchema);

module.exports = User;
