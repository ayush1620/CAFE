const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    heading:{
        type: String,
        required: true,
    },
    Message:{
        type: String,
    }
},{
    timestamps: true,
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;