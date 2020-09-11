const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    store:{
        type:String
    },
    text:{
        type:String
    },
    rating:{
        type:Number
    },
    author:{
        type:String
    }
})

module.exports = mongoose.model('review',schema);