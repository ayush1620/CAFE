const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    people:{
        type: Number,
        required : true,
    },
    Timing:{
        type: Date,
        required: true,
    },
    Message:{
        type: String,
    },
    Number:{
        type: Number,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;