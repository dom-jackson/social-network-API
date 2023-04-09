const { Schema, model } = require('mongoose');

let Thought;

const reactionSchema = new Schema({
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema],
  },
  { toJSON: { virtuals: true }, id: false }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

Thought = model('Thought', thoughtSchema);

module.exports = Thought;
