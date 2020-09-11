const mongoose = require('mongoose');
const review = mongoose.model('review');
exports.addReview = async(req,res)=>{
    req.body.author = req.user._id;
    req.body.store = req.params.storeId;
    const newReview = new review(req.body);
    await newReview.save();
    res.redirect('back');
}