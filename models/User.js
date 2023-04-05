const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  thoughts: [thoughtSchema],
  friends: [userSchema],
});

const User = model('User', userSchema);

module.exports = User;
