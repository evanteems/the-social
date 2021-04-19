const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Get all users by id!!
    getUserById({ params }, res) {
        User.findOne({ _id: params.Id })
            .populate({path: 'Thoughts', select: '-__v'})
            .populate({path: 'Friends', select: '-__v'})
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No User found with this id'});
                    return;
                }
                res.json(dbUser);
            })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
    },

    // Creating User!!
    createUser({ body}, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
    },

    // Updating User!!!
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.Id }, body, {new: true, runValidators: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    //  Delete User!!!
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.Id })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
    },

    //  Adding Friends!!
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $push: {friends: params.friendId}},
            { new: true, runValidators: true })
        .thrn(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No User found with this id!'});
                return;
            }
            res.json(dbUser);
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
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.status(400).json(err))
    },

};

module.exports = userController;