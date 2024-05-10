const express=require('express');

const router=express.Router();

const async_handler=require('../Middleware/async_handler');

const {
    getFeeds,
    getfeedbylikes,
    getfeedbydislikes,
    getfeedbycomment
} = require('../Controller/feed');

router.route('/getfeeds/:id').post(async_handler(getFeeds));
router.route('/getfeedsbylike/:id').post(async_handler(getfeedbylikes));
router.route('/getfeedsbydislike/:id').post(async_handler(getfeedbydislikes));
router.route('/getfeedsbycomment/:id').post(async_handler(getfeedbycomment));




module.exports=router;
