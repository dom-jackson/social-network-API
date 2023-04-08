const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
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
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
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
    User.findOneAndDelete({ _id: req.params.userId })
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
};

module.exports = userController;
