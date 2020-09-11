const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name : {
        type:String,
        required: 'thanks to introduce a name'
    },
    slug:{
        type:String,
        trim:true
    },
    description:{
        type:String
    },
    photo :{
        type:String
    },
    location:{
        type:{
            type:String,
            default:'Point'
        },
        coordinates:[
            {
                type:Number
            }
        ],
        address:{
            type:String
        }
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
schema.pre('save', async function(next){
    const slug = require('slugs');
    this.slug = slug(this.name);
    const storesWithSlug = await this.constructor.find({slug:this.slug})
    if( storesWithSlug.length) this.slug = `${this.slug}-${storesWithSlug.length+1}`
    next();
})
schema.virtual('reviews',{
    ref:'review',
    localField:'_id',
    foreignField:'store'
});
function autopopulate(next){
    this.populate('reviews');
    next();
}
schema.pre('find',autopopulate);
schema.pre('findOne',autopopulate);
module.exports = mongoose.model('store',schema);