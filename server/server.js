import express from 'express';
import cors from 'cors';
import { Grocery } from './models/groceryModel.js';

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

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM groceries WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Entry deleted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
