const { Comment, Pizza } = require('../models');

const commentController = {
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id }},
                    {new: true, runValidators: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizzas found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // Reply adds to comment
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body }},
            {new: true, runValidators: true }
        )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this Id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => 
                res.json(err));
    },

    // Comments beong removed!!
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deleteComment => {
                if (!deleteComment) {
                    res.status(404).json({ message: 'There is no comment with thisd id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // Replies Removed!!
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: {replyId: params.replyId }}},
            { new: true }
        )
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
};

module.exports = commentController;