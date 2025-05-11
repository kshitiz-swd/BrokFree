const express = require('express')
const userAuth = require('../middlewares/userAuth')
const { createProperty, getAllproperty, getAproperty, deleteAproperty, editAproperty, uploadPropertyImage } = require('../controllers/propertyController')
const upload = require('../middlewares/upload'); 

const router = express.Router()

router.post('/property', userAuth, upload.array('images',5), createProperty)

router.get('/property', getAllproperty)

router.get('/property/:id', getAproperty)

router.patch('/property/:id', userAuth, editAproperty)

router.delete('/property/:id', userAuth, deleteAproperty)



module.exports = router
