const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({ path: 'thought', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select( '-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get all users by id!!
    getUserById({ params }, res) {
        User.findOne({ _id: params.Id })
            .populate({path: 'Thoughts', select: '-__v'})
            .populate({path: 'Friends', select: '-__v'})
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
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
            .catch(err => res.status(400).json(err));
    },

    //  Delete User!!!
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.Id })
            .then( dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id!' });
                    return;
                };
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //  Adding Friends!!
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $push: {friends: params.friendId}},
            { new: true })
        .populate({ path: 'friends', select: ( '-__v' )})
        .select( '-__v')
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json({ message: 'No User found with this id!'});
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.status(400).json(err));
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