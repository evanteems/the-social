const { Pizza } = require('../models');

const pizzaController = {
    // GET pizzas here
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'commnets',
                select: '-__v'
            })
            .select('__v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => res.json(dbPizzaData))
            .catcg( err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Creating a Pizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(er => res.json(err));
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // delete Pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
};

module.exports = pizzaController;