const express=require('express');

const router=express.Router();

const async_handler=require('../Middleware/async_handler');

const {
    likePost
} = require('../Controller/like');

router.route('/likepost').post(async_handler(likePost));

module.exports=router;
