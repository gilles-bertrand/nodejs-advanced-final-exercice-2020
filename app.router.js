const express = require('express');
const { home, store, addStore, register,login } = require('./controllers/pages');
const { createStore, upload, resize } = require('./controllers/stores');
const {registerUser} = require('./controllers/users');
const { isLoggedIn, loginUser} = require('./controllers/authentication');
const router = express.Router();

router.get('/',home);
router.get('/addshop',isLoggedIn,addStore);
router.get('/stores/:slug', store);
router.get('/register', register);
router.get('/login',login)
router.post('/stores/add', upload, resize,createStore);
router.post('/register',registerUser)
router.post('/login',loginUser)


module.exports = router;