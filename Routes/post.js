const express=require('express');

const router=express.Router();

const async_handler=require('../Middleware/async_handler');

const {
    CreatePost,
    GetAllPosts,
    GetPostById,
    DeletePostById
} = require('../Controller/post');

router.route('/create').post(async_handler(CreatePost));

router.route('/getallposts').get(async_handler(GetAllPosts));

router.route('/getpostbyid/:id').post(async_handler(GetPostById));

router.route('/deletepostbyId/:id').delete(async_handler(DeletePostById));

module.exports=router;
