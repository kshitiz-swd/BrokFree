const express = require('express');
const router = express.Router();
const  searchProperties  = require('../controllers/searchController');
const userAuth = require('../middlewares/userAuth');

router.get('/search', userAuth, searchProperties);

module.exports = router;