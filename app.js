const express = require('express');
const cors = require('cors');
const historyController = require('./controllers/historyController');
const app = express();

app.use(express.json());
app.use(cors('*'));
app.use('/history', historyController);

app.get("/", (req, res) => {
    res.send("Welcome to the Calculator!")
});

app.get("*", (req, res) => {
    res.status(404).json({error: "Path not found"})
});

module.exports = app; 