const mongoose = require('mongoose')

const userPreferenceSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique: true
    },
    location:{
        state: String,
        city: String
    },
    priceRange:{
        min: Number, 
        max: Number 
    },
    availability:{
        type:Boolean
    },
    featurePreferences: [{
        featureType: {
          type: String,
          enum: ['flooring', 'room', 'kitchen', 'bathroom', 'balcony', 'furniture', 'other']
        },
      }],
      dimensions: {
        minLength: Number,
        minWidth: Number
      }
},{timestamps: true})

module.exports = mongoose.model('UserPreference', userPreferenceSchema)