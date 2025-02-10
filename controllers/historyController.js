const express = require('express');
const history = express.Router();

const {
    viewAllCalcs
} = require('../queries/historyQueries');


history.get('/', async (req, res) => {
    const calcHistory = await viewAllCalcs();

    if(calcHistory[0]) {
        res.status(200).json(calcHistory)
    } else {
        res.status(500).json({error: "Server error"})
    }
});

module.exports = history;