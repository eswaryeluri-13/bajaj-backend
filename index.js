const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
