const express = require('express');
const { home, store, addStore } = require('./controllers/pages');
const { createStore } = require('./controllers/stores');
const router = express.Router();

router.get('/', home);
router.get('/addshop',addStore)
router.get('/stores/:slug', store);
router.post('/stores/add', createStore);


module.exports = router;