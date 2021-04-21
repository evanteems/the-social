const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller');

const {
    addReaction,
    removeReaction
} = require('../../controllers/reaction-controller');

//  /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//  /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//  /api/thought/:thougthId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

//  /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;