const mongoose = require('mongoose');
const { cachePartials } = require('express-hbs');
const store = mongoose.model('store');
const review = mongoose.model('review');
exports.home = async (req,res)=>{
    const stores = await store.find({}).lean();
   
    res.render('home',{title:'Welcome to TRIPTYK shops',stores})
}
exports.store = async (req,res)=>{
    try{
        const details = await store.findOne({slug:req.params.slug}).lean()
        try{
            res.render('store-details',{title:'Shops details', details})
        }
        catch(e){
            console.log(e)
        }
       
    }catch(e){
        console.log(e)
    }
}

exports.addStore = async(req,res)=>{
    res.render('add-store',{title:'add a store'})
}
exports.register = async(req,res)=>{
    res.render('register',{title:'Register user form'})
}
exports.login = async(req,res)=>{
    res.render('login',{title:'login user form'})
}

