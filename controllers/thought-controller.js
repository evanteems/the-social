const { Thought, User } = require('../models');

const ThoughtController = {
    // GET Thoughts here
    getAllThought(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v '})
                .select('-__v')
                .sort({ _id: -1 })
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
    },

    // get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Creating a Thought
    createThought({ body }, res) {
        Thought.create(body).then(dbThoughtData => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: dbThoughtData._id}},
                {new: true}
            )
        })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // Update Thoughts
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id},
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this Id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // Delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;