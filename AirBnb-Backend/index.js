const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel')
require('dotenv').config();

const app = express(10);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);
const salt = bcrypt.genSaltSync();
const jwtSecret = "fjhgjdi83948479hkrshkshgh948y";

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const UserDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        res.json({ UserDoc });
    } catch (e) {
        console.log(e);
        res.status(422).json({ e });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let UserDoc = await UserModel.findOne({ email: email });
        if (UserDoc) {
            const passwordOk = bcrypt.compareSync(password, UserDoc.password);
            if (passwordOk) {
                let token = await jwt.sign({ email: email, id: UserDoc._id }, jwtSecret);
                res.cookie('token', token).status(201).send('Login Succesful');
            } else {
                res.status(422).send('login attempt failed')
            }
        } else {
            res.status(404).send('User Not Found')
        }
    } catch (e) {
        console.log(e);
        res.status(422).send('login attempt failed')
    }

})

app.listen(3000, () => console.log("now listening on port 3000"));