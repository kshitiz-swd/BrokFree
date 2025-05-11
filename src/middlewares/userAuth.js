const express = require('express')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY
const User = require('../models/userModel')


const userAuth = async(req, res, next)=>{
    try{
        const {token} = req.cookies

        if(!token){
            throw new Error("Unauthorized token")
        }
    
        const verifyUser = jwt.verify(token, secret_key)
     
        const user = await User.findById(verifyUser._id)
    
        if(!user){
            throw new Error("User not found")
        }
    
        req.user = user
        next()

        }catch(err){
            res.status(400).send(err.message)
    }  
}

module.exports = userAuth