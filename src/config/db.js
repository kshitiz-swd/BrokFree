const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://realestateUser:Real1234Estate@realestatecluster.wf4vbn2.mongodb.net/realEstateDB')

}

module.exports = connectDB