const mongoose = require('mongoose');
const store = mongoose.model('store');
exports.home = async (req,res)=>{
    const stores = await store.find({}).lean();
    res.render('home',{title:'Welcome to TRIPTYK shops',stores})
}