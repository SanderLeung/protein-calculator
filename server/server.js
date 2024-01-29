import express from 'express';
import cors from 'cors';
import { Grocery } from './models/groceryModel.js';
import sequelize from 'sequelize';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/grocery',  async (req, res) => {
    try {
        const grocery = await Grocery.create(req.body);
        res.status(201).send(`${JSON.stringify(grocery)} added successfully`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/groceries', async (req, res) => {
    try {
        const groceries = await Grocery.findAll();
        return res.status(200).json(groceries);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/groceries/:id', async (req, res) => {
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
        res.status(500).send('Internal Server Error');
    }
});

app.put('/groceries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = JSON.stringify(req.body);
        await Grocery.update(req.body, {
            where: {
                id: id
            }
        });
        return res.status(200).send(`Updated ${id} with ${body}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/groceries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Grocery.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send('Deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
