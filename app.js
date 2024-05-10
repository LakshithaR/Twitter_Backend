const express = require('express');

const connectdb = require('./db');

const app=express();

const dotenv = require('dotenv');

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// // Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const OtpRoute = require('./Routes/otp');

app.use('/otp',OtpRoute);

const UserRoute = require("./Routes/user");

app.use('/user',UserRoute);

const PostRoute = require("./Routes/post");

app.use('/post',PostRoute);

const LikeRoute = require("./Routes/like");

app.use('/like',LikeRoute);

const FollowRoute = require("./Routes/follow");

app.use('/follow',FollowRoute);

const FeedRoute = require("./Routes/feed");

app.use('/feed',FeedRoute);

app.get("/getuser", (request,response)=>{

    response.json({
        name:'Lakshitha',
    })
})


const error_handler=require('./Middleware/error_handler');

const not_found_middleware=require('./Middleware/not_found_middleware');

app.use(not_found_middleware);

app.use(error_handler);


connectdb('mongodb://localhost:27017').then(()=>{
    console.log("Database Connected");
    app.listen(5000,()=> {
        console.log("Server Running.");
    })
}).catch((err)=>{
    console.log(err);
});