const express = require('express');
const { home, store, addStore, register, login } = require('./controllers/pages');
const { createStore, upload, resize } = require('./controllers/stores');
const { registerUser } = require('./controllers/users');
const { isLoggedIn, loginUser, logout } = require('./controllers/authentication');
const { addReview, validateReview } = require('./controllers/reviews');
const { body, check, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const storeModel = mongoose.model('store');
const router = express.Router();

router.get('/', home);
router.get('/addshop', isLoggedIn, addStore);
router.get('/stores/:slug', store);
router.get('/register', register);
router.get('/login', login)
router.get('/logout', logout)
router.post('/stores/add', upload, resize, createStore);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/reviews/add/:storeId', [
    body('text', 'you must insert a text').notEmpty(),
    body('rating', 'you must insert a rating').notEmpty(),

], async (req, res,next) => {
    const errors = validationResult(req);
    if (errors) {
        try {
            const details = await storeModel.findOne({ _id: req.params.storeId }).lean()
            try {
                // console.log(errors)
                res.render('store-details', { title: 'Shops details', details, errors: errors.errors })
            }
            catch (e) {
                console.log(e)
            }

        } catch (e) {
            console.log(e)
        }
    }
    next()
}, addReview);


module.exports = router;