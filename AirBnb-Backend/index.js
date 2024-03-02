const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const PlaceModel = require('./models/PlaceModel');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const { log } = require('console');


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
});
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

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const ext = originalname.split('.')[originalname.split('.').length - 1];
    fs.renameSync(path, path + '.' + ext);
    const newPath = path + '.' + ext;
    const newName = newPath.split('\\')[newPath.split('\\').length - 1];
    uploadedFiles.push(newName);
  }
  res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, address, photos, photoLink, description, perks, extraInfo, checkIn, checkOut, maxGuest, price } = req.body;
    console.log(maxGuest);
    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let UserDoc = await UserModel.findById(decodedJson.id);
      let data = {
        owner: UserDoc._id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests: Number(maxGuest),
        price
      };
      const placeDoc = await PlaceModel.create(data);
      res.status(201).json(placeDoc);
    } else {
      res.status(403).send('un authenticated rbuh');
    }
  } catch (e) {
    console.log(e.message);
    res.status(403).send('un authenticated');
  }
});

app.get('/user-places', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let UserDoc = await UserModel.findById(decodedJson.id);
      let places = await PlaceModel.find({ owner: UserDoc._id });
      res.status(200).json(places);
    }
    else {
      res.status(403).send("un authenticated");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('internal server error');
  }
});

app.get("/places/:id", async (req, res) => {
  const id = req.params.id;
  let place = await PlaceModel.findById(id);
  res.json(place);
});

app.put("/places/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    const id = req.params.id;
    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let UserDoc = await UserModel.findById(decodedJson.id);
      let place = await PlaceModel.findById(id);
      if (place.owner.toString() !== UserDoc._id.toString()) {
        throw new Error('unauthorized');
      }

      const { title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuest, price } = req.body;
      place.set({ title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests: maxGuest, price });
      await place.save();
      res.status(201).json(place);
    }
    else {
      res.status(403).send("un authenticated")
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('internal server error');
  }
});

app.get('/places', async (req, res) => {
  res.json(await PlaceModel.find({}))
});

app.listen(3000, () => console.log("now listening on port 3000"));




































