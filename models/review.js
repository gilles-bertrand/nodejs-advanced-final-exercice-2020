const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    store : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'store'
    },
    text:{
        type:String
    },
    rating:{
        type:Number
    },
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
function autopopulate(next) {
    this.populate('author');
    next();
  }
  
  schema.pre('find', autopopulate);
  schema.pre('findOne', autopopulate);
module.exports = mongoose.model('review',schema);