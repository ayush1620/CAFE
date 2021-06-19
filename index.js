const { render } = require('ejs');
const express = require('express');
const { rename } = require('fs');
const { Query } = require('mongoose');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Booking = require('./models/booking');
const Review = require('./models/review');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use('/assets',express.static('./assets'));


app.get('/',function(req,res){
    return res.render('home',{ 
        title: "CAFE Delight",
    }); 
});

app.get('/see',function(req,res){
    return res.render('see',{ 
        title: "YOUR BOOKING",
    }); 
});

app.get('/cancel',function(req,res){
    return res.render('cancel',{ 
        title: "CAFE Delight",
    }); 
});

app.get('/review',function(req,res){
    Review.find({}, function(err,reviews){
        if(err){
            console.log("error in fetching reviews from db");
            return;
        }
        return res.render('review',{ 
            title: "REVIEWS",
            rvs: reviews
        });
    }) 
})

app.post('/type',function(req, res){
    console.log(req.body);
    Review.create({
        name: req.body.name,
        email: req.body.email,
        heading: req.body.heading,
        Message: req.body.review
        }, function(err, newReview){
            if(err){console.log('Error in posting Review!',err)
                return;}
                return res.render('home',{
                    title: "CAFE Delight"
                });
        })
    });

app.post("/book", function(req, res){  
    console.log(req.body.name);
    Booking.findOne({Number: req.body.Number}, function(err, user){
        if(err){console.log('Error in creating Reservation!',err);
            return}
        if(!user){
        Booking.create({
            name: req.body.Name,
            people: req.body.People,
            Timing: req.body.date,
            Message: req.body.Message,
            Number: req.body.Number,  
            password: req.body.password,
        }, function(err, newBooking){
            if(err){console.log('Error in creating Reservation!',err)
                return;}
                console.log('********', newBooking);
                return res.render('done',{
                    title: "THANKYOU",
                    date: req.body.date,
                    ppl: req.body.People,
                });
            })
        }
        if(user){
            return res.render('open',{
            title: "CAFE Delight",
            name: user.name,
            people: user.people,
            Timing: user.Timing,
            Message: user.Message,
            Number: user.Number,
            });
        }
    });
});

app.post("/open",function(req,res){
    Booking.findOne({Number: req.body.Number},function(err, user2){
        if(err){
            console.log('error in finding the reservation');
            return;
        }
        if(user2){
            if(user2.password==req.body.password){
                return res.render('open',{
                    title: "CAFE Delight",
                    name: user2.name,
                    people: user2.people,
                    Timing: user2.Timing,
                    Message: user2.Message,
                    Number: user2.Number,  
                });
            }
        }
        if(!user2){
            return res.render('notfound',{
                title: "CAFE Delight"
            })
        }
    });
});

app.post('/delete',function(req, res){
    Booking.findOne({Number: req.body.Number},function(err, user1){
        if(err){
            console.log('error in deleting the reservation');
            return;
        }
        if(user1){
            if(user1.password==req.body.password){
                Booking.findByIdAndDelete(user1._id,function(err){
                    if(err){
                    console.log('error in deleting the reservation',err);
                    }
                });
                return res.render('home',{
                    title: "CAFE Delight",
                });
            }
        }
    });
});

app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('My express server is running on port:',port);
});
