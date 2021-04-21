const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '_id'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get all users by id!!
    getUserById({ params }, res) {
        User.findOne({ _id: params.Id })
            .populate({
                path: 'friends',
                select: '_id'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.sendStatus(400).json({ message: 'No User found with this id!'});
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).json({ message: 'No User found with this id!'});
            });
    },

    // Creating User!!
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // Updating User!!!
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.Id }, body, {new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => res.json(err));
    },

    //  Delete User!!!
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.Id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(404).json({ message: 'No User found with this id!' }));
    },

    //  Adding Friends!!
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: { _id: params.friendId}}},
            { new: true, runValidators: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(404).json({ message: 'No user found with this id!' }));
    },

    // Removing Friends!!
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            {new: true, runValidators: true}
        )
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.status(400).json(err))
    },

};

module.exports = userController;