const express = require('express');
const { home, store, addStore, register,login } = require('./controllers/pages');
const { createStore, upload, resize } = require('./controllers/stores');
const {registerUser} = require('./controllers/users');
const { isLoggedIn, loginUser, logout} = require('./controllers/authentication');
const { addReview } = require('./controllers/reviews');
const router = express.Router();

router.get('/',home);
router.get('/addshop',isLoggedIn,addStore);
router.get('/stores/:slug', store);
router.get('/register', register);
router.get('/login',login)
router.get('/logout',logout)
router.post('/stores/add', upload, resize,createStore);
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/reviews/add/:storeId', addReview);


module.exports = router;