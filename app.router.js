const express = require('express');
const { home, store } = require('./controllers/pages');
const router = express.Router();

router.get('/', home);
router.get('/stores/:slug', store);


module.exports = router;