const mongoose = require('mongoose');

const InteriorFeatureSchema = new mongoose.Schema({
  featureType: {
    type: String,
    required: true,
    enum: ['flooring', 'room', 'kitchen', 'bathroom', 'balcony', 'furniture', 'other']
  },
  description: {
    type: String,
    required: true
  },
  dimensions: {
    length: Number, 
    width: Number
  }
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  price: {
    type: Number,
    required: true
  },
  interiorFeatures: {type:[InteriorFeatureSchema], required : true}, 
  images: [String],
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
