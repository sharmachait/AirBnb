const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);


app.post('/register', (req, res) => {
    const { name, email, passowrd } = req.body;
    res.json({ name, email, passowrd });
});

app.listen(3000, () => console.log("now listening on port 3000"));