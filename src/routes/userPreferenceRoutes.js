const express = require('express')
const userAuth = require('../middlewares/userAuth')
const { addPreference, deletePreference, getPreference } = require('../controllers/userPreferenceController')

const router = express.Router()

router.post('/preference', userAuth, addPreference)

router.get('/preference', userAuth, getPreference)

router.delete('/preference', userAuth, deletePreference)


module.exports = router