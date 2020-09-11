const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const review = mongoose.model('review');

exports.validateReview = async (req,res,next)=>{
    const errors = validationResult(req);
    if(errors){
        console.log(errors)
        res.redirect('/');
    }
    next();
}
exports.addReview = async(req,res)=>{
    req.body.author = req.user._id;
    req.body.store = req.params.storeId;
    const newReview = new review(req.body);
    await newReview.save();
    res.redirect('back');
}