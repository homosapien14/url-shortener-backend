const express = require('express');
const {createShortUrl,getLongUrl} = require('../controllers/url.controller');
const router = express.Router();    

//@route POST/api/url/shorten
//@desc create a short URL

router.post('/api/url/shorten',createShortUrl);

//@route  GET /:code
//@desc redirect to long original url

router.get('/:code',getLongUrl);

module.exports = router;