const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params._id })
      .populate({
        path: 'thoughts friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params._id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({
          message: 'User and associated thoughts deleted successfully!',
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // POST to add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = userController;
