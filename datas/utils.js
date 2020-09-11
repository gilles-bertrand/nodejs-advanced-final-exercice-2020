require('dotenv').config({ path: `${__dirname}/../.variables.env` });
const fsp = require('fs').promises;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
async function init() {
    await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
    const review = await require('../models/review');
    const reviews = await review.find();

    reviews.forEach(async reviewI => {
        try {
            reviewI.store_id = mongoose.Types.ObjectId(reviewI.store);
            reviewI.author_id = mongoose.Types.ObjectId(reviewI.author);
            
            const newReview = new review(reviewI)
            console.log(newReview)
            await newReview.save();
        } catch (e) { console.log(e) }



    })
    // console.log(reviews)
    process.exit(0)
}
init()