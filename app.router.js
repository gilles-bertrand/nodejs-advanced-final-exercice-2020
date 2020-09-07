const express = require('express');
const { home } = require('./controllers/pages');
const router = express.Router();

router.get('/', home);


module.exports = router;