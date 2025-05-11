const express = require('express')
const UserPreference = require('../models/userPreference')

const addPreference = async(req, res)=>{
    try{
        const existingPref = await UserPreference.findOne({user: req.user._id})
        if(existingPref){
            const upadatedPref = await UserPreference.findOneAndUpdate({user: req.user._id}, req.body,{new: true})
            return res.json(upadatedPref);
        }

        const preference = new UserPreference({
            ...req.body,
            user: req.user._id
        })

        await preference.save()
        res.status(201).json(preference);

    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
}

const getPreference = async (req, res) => {
    try {
      const preference = await UserPreference.findOne({ user: req.user._id });
      if (!preference){
        return res.status(404).json({ message: 'Not found' });
      } 
      res.status(200).json(preference);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

const deletePreference = async (req, res) => {
    try {
      await UserPreference.findOneAndDelete({ user: req.user._id });
      res.status(200).json({message:'Preference deleted successfully'});
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
  

module.exports = {addPreference, deletePreference, getPreference}