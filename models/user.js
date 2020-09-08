const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const schema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required: 'Please supply an email address'
    },
    name:{
        type:String,
        required:'Please provide a name',
        trim:true
    }
})
schema.plugin(passportLocalMongoose,{usernameField:'email'})
module.exports = mongoose.model('user',schema);