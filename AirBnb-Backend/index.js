const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');

require('dotenv').config();

const app = express(10);

app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '\\uploads'));
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
        res.cookie('token', token).status(201).json({ UserDoc });
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
app.get('/profile', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let UserDoc = await UserModel.findById(decodedJson.id);
      res.json({
        email: UserDoc.email,
        name: UserDoc.name,
        id: UserDoc._id
      });
    } else {
      res.json(null);
    }
  } catch (e) {
    res.status(403).send('un authenticated');
  }
});

app.post('/logout', async (req, res) => {
  res.status(200).cookie('token', '').json({ loggedout: true });
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo_' + Date.now() + '.jpg';
  const options = {
    url: link,
    dest: __dirname + '\\uploads\\' + newName
  };
  let response = await imageDownloader.image(options);
  res.json(newName);
});

app.listen(3000, () => console.log("now listening on port 3000"));