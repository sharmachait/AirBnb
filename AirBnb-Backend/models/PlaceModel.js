const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  extraInfo: String,
  price: Number
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;