const express = require('express');
const history = express.Router();

const {
    viewAllCalcs,
    addCalcToHistory
} = require('../queries/historyQueries');


history.get('/', async (req, res) => {
    const calcHistory = await viewAllCalcs();

    if(calcHistory) {
        res.status(200).json(calcHistory)
    } else {
        res.status(500).json({error: "Server error"})
    }
});

history.post('/', async (req, res) => {
    const { calculation } = req.body
    const calcAddedToDb = await addCalcToHistory(calculation);

    if(calcAddedToDb.id) {
        res.status(200).send('Calc added successfully')
    } else {
        res.status(500).json({error: 'something went wrong'})
    }
});

history.put('/:id', async (req, res) => {

});

history.delete('/:id', async (req, res) => {

});

module.exports = history;