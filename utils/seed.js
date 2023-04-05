const connection = require('../config/connection');
const { User, Thought } = require('../models');

const users = [
  {
    username: 'John Doe',
    email: 'jd@hotmail.com',
    friends: ['Jane Smith', 'Josh Campbell'],
  },
  {
    username: 'Jane Smith',
    email: 'janesmith@gmail.com',
    friends: ['John Doe', 'Josh Campbell'],
  },
  {
    username: 'Josh Campbell',
    email: 'joshc@bigpond.com',
    friends: ['John Doe', 'Jane Smith'],
  },
];

const thoughts = [
  {
    thoughtText:
      'I just finished a great workout at the gym! Feeling energized and ready to take on the day!',
    username: 'John Doe',
    reactions: [
      {
        reactionBody: 'Awesome job! Keep up the good work!',
        username: 'Jane Smith',
      },
      {
        reactionBody: 'That sounds like a great way to start the day!',
        username: 'Josh Campbell',
      },
    ],
  },
  {
    thoughtText:
      "I can't believe it's already Friday! This week flew by so fast!",
    username: 'Jane Smith',
    reactions: [
      {
        reactionBody: 'I know, right? Where did the week go?',
        username: 'John Doe',
      },
    ],
  },
  {
    thoughtText: 'Today is a beautiful day!',
    username: 'Josh Campbell',
    reactions: [
      {
        reactionBody: 'I completely agree!',
        username: 'John Doe',
      },
      {
        reactionBody: 'Me too!',
        username: 'Jane Smith',
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await connection.dropDatabase();
    const createdUsers = await User.insertMany(users);
    const thoughtsWithUsers = thoughts.map((thought) => {
      const user = createdUsers.find(
        (user) => user.username === thought.username
      );
      thought.username = user._id;
      return thought;
    });
    await Thought.insertMany(thoughtsWithUsers);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error(error);
  }
}

connection.once('open', seedDatabase);
