const express = require('express')
const userPreference = require('../models/userPreference')
const Property = require('../models/propertyModel')


const searchProperties = async(req, res)=>{
    const userId = req.user._id
    try{
        const userPref = await userPreference.findOne({user: userId})

        if (!userPref) {
            return res.status(404).json({ error: 'User preferences not set.' });
          }
    
          const query = {}
            if (userPref.location?.city) {
                query['location.city'] = userPref.location.city;
            }
              
            if (userPref.location?.state) {
                query['location.state'] = userPref.location.state;
            }
    
            if (userPref.priceRange) {
                query.price = {};
                if (userPref.priceRange.min !== undefined) {
                  query.price.$gte = userPref.priceRange.min;
                }
                if (userPref.priceRange.max !== undefined) {
                  query.price.$lte = userPref.priceRange.max;
                }
            }
    
            if(userPref.featurePreferences?.length >0){
                query['interiorFeatures.featureType'] = {
                    $all: userPref.featurePreferences.map(f => f.featureType)
                }
            }
    
            const properties = await Property.find(query).sort({ price: 1 }); 
            console.log(properties)
            
    
            res.json(properties);
    }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed.' });
  }
}

module.exports = searchProperties