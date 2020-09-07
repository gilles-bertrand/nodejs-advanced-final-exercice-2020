const mongoose = require('mongoose');
const { cachePartials } = require('express-hbs');
const store = mongoose.model('store');
exports.home = async (req,res)=>{
    const stores = await store.find({}).lean();
    res.render('home',{title:'Welcome to TRIPTYK shops',stores})
}
exports.store = async (req,res)=>{
    try{
        const details = await store.findOne({slug:req.params.slug}).lean()
        res.render('store-details',{title:'Shops details', details})
    }catch(e){
        console.log(e)
    }
}