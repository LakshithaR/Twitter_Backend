const express=require('express');

const router=express.Router();

const async_handler=require('../Middleware/async_handler');

const {
    followUser,
    unfollowUser,
    getallfollows
} = require('../Controller/follow');

router.route('/followuser').post(async_handler(followUser));

router.route('/unfollowuser').post(async_handler(unfollowUser));

router.route('/getallfollows').get(async_handler(getallfollows));

module.exports=router;
