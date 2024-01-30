const Grocery = require("../models/groceryModel");

const createGrocery = async (req, res) => {
    try {
        const grocery = await Grocery.create(req.body);
        res.status(201).send(`${JSON.stringify(grocery)} added successfully`);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

const getGroceries = async (req, res) => {
    try {
        const groceries = await Grocery.findAll();
        return res.status(200).json(groceries);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

const getGrocery = async (req, res) => {
    try {
        const id = req.params.id;
        const groceries = await Grocery.findAll({
            where: {
                id: id
            }
        });
        return res.status(200).json(groceries);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

const updateGrocery = async (req, res) => {
    try {
        const id = req.params.id;
        const body = JSON.stringify(req.body);
        const groceries = await Grocery.update(req.body, {
            where: {
                id: id
            }
        });
        if (!groceries) {
            return res.status(404).json({ message: 'Not found' });
        }
        return res.status(200).send(`Updated ${id} with ${body}\n`);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

const deleteGrocery = async (req, res) => {
    try {
        const id = req.params.id;
        const groceries = await Grocery.destroy({
            where: {
                id: id
            }
        });
        if (!groceries) {
            return res.status(404).json({ message: 'Not found' });
        }
        return res.status(200).send(`Deleted ${id}\n`);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    createGrocery,
    getGroceries,
    getGrocery,
    updateGrocery,
    deleteGrocery
};