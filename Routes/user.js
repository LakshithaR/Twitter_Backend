const express=require('express');

const router=express.Router();

const async_handler=require('../Middleware/async_handler');

// const authentication_middleware=require('../Middleware/authentication');

// const basic_auth = require('../Middleware/basic_auth');

const {
    CreateUser,
    getallusers,
    getuserbyid,
    getuserbyname,
    updateUserById,
    DeleteUserById,
    login,
    getfollower,
    getfollowing
} = require('../Controller/user');

router.route('/create').post(async_handler(CreateUser));

router.route('/login').post(async_handler(login));

router.route('/getallusers').get(async_handler(getallusers));

router.route('/getuserbyid/:id').post(async_handler(getuserbyid));

router.route('/getfollowing/:id').post(async_handler(getfollowing));

router.route('/getfollower/:id').post(async_handler(getfollower));

router.route('/getuserbyname/:name').post(async_handler(getuserbyname));

router.route('/updateUserById/:id').patch(async_handler(updateUserById));

router.route('/deleteuserbyId/:id').delete(async_handler(DeleteUserById));

module.exports=router;

