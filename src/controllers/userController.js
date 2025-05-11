const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const generateToken = require('../config/jwt')

const registerUser = async (req, res) => {
    try {
      const { name, emailId, password, number } = req.body;
  
      if (!name || !emailId || !password || !number) {
        return res.status(400).json({ error: "Missing Fields!!" });
      }
  
      const existingUser = await User.findOne({ emailId });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists with this email."});
      }
  
      const hashPassword = await bcrypt.hash(password, 10); 
  
      const newUser = new User({
        name,
        emailId,
        password: hashPassword,
        number
      });
  
      await newUser.save();
  
      const token = generateToken({ _id: newUser._id });
      res.cookie('token', token)
      res.status(201).json({ message: "User registered successfully", data: newUser});
  
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
        const{password, emailId} = req.body
  
      if (!emailId || !password) {
        return res.status(400).json({ error: "Missing Fields!!" });
      }
  
      const existingUser = await User.findOne({ emailId });
      if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Wrong password entered" });
      }
  
      const token = generateToken({ _id: existingUser._id });
  
      res.cookie("token", token);
  
      res.status(200).json({
        message: "Logged in successfully",
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

const logoutUser = (req, res)=>{
    res.cookie("token", null,{expires: new Date(Date.now())})

    res.status(200).json({message:'logout successfull'})
}

module.exports = {loginUser, registerUser, logoutUser}
