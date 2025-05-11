const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true,
        minLength:4,
        maxLength:30
    },
    emailId :{
        type:String,
        required: true,
        unique : true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format")
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password entered")
            }
        }
    },
    number:{
        type:String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Invalid number entered")
            }
        }
    }
}, {timestamps:true})


module.exports = mongoose.model("User", UserSchema)