const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./database.db');

app.use(express.json());
app.use(cors());

app.post('/submit', (req, res) => {
    const { name, protein, calories, servings, cost } = req.body;

    db.run(
        'INSERT INTO groceries (name, protein, calories, servings, cost) VALUES (?, ?, ?, ?, ?)',
        [name, protein, calories, servings, cost],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(201).send('Entry added successfully');
            }
        }
    );
});

app.get('/graph-data', (req, res) => {
    db.all('SELECT * FROM groceries ORDER BY (protein / calories) DESC', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
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
