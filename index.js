const express = require('express')
const connectDB = require('./src/config/db')
const authRouter = require('./src/routes/authRoutes');
const propertyRouter = require('./src/routes/propertyRoutes');
const preferenceRouter = require('./src/routes/userPreferenceRoutes')
const searchRouter = require('./src/routes/searchRoutes')
const cookieParser = require('cookie-parser');
const path = require('path');


require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRouter)
app.use('/', propertyRouter)
app.use('/', preferenceRouter)
app.use('/', searchRouter)

connectDB().then(()=>{
    console.log('connected to the database')
    app.listen(PORT, ()=>{
        console.log('Server is listening on PORT:', PORT)
    })
}).catch((err)=>{
    console.error("we cannot Connect to Database")
})

