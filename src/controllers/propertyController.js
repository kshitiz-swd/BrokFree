const express = require('express')
const Property = require('../models/propertyModel');
const validateEditData = require('../utils/validate');

const createProperty = async (req, res) => {
  const loggedInUser = req.user

    try {
        const { name, location, price, interiorFeatures, availability } = req.body;

        if (!name || !location || !price || !interiorFeatures) {
            return res.status(400).json({ error: "Missing required fields or images" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
        const parsedFeatures = interiorFeatures ? JSON.parse(interiorFeatures) : [];

        const existingProperty = await Property.findOne({
          'location.address': parsedLocation.address,
          'location.city': parsedLocation.city,
          'location.state': parsedLocation.state
        });
    
        if (existingProperty) {
          return res.status(400).json({ error: "Property already exists" });
        }

        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        
        const newProperty = new Property({
            user: loggedInUser._id,
            name,
            location: parsedLocation,
            price,
            interiorFeatures: parsedFeatures,
            images: imagePaths,
            availability: availability === 'true'
        });

        await newProperty.save();

        res.status(201).json({ message: "New property saved", property: newProperty });
    } catch (err) {
        console.error("Error saving property:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllproperty = async(req, res)=>{

    const allProperty = await Property.find({})

    res.status(201).json({message:"All properties", properties: allProperty})
}

const getAproperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property found", property });
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editAproperty = async(req, res)=>{
    const { id } = req.params;
    try {
        
    if(!validateEditData(req)){
        throw new Error("Invalid Edit Request")
    }
        const property = await Property.findById(id);
    
        if (!property) {
          return res.status(404).json({ message: "Property not found" });
        }
        if (!property.user.equals(req.user._id)) {
          return res.status(403).json({ message: "Not authorized to edit this property" });
        }

        Object.keys(req.body).forEach((key)=> property[key] = req.body[key])

        await property.save();
    
        res.status(200).json({ message: "Property updated successfully", property });
      } catch (err) {
        console.error("Error fetching property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const deleteAproperty = async(req, res)=>{
    const {id} = req.params
    const loggedInUser = req.user

    try {

      const property = await Property.findById(id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      if (!property.user.equals(req.user._id)) {
        return res.status(403).json({ message: "Not authorized to delete this property" });
      }

      await Property.findByIdAndDelete(id);
    
        res.status(200).json({ message: "Property deleted successfully" });
      } catch (err) {
        console.error("Error deleting property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports= {createProperty, getAllproperty, getAproperty, editAproperty, deleteAproperty}