const express=require('express');
const router=express.Router();

const {getAllUsers,getSingleUser,updateUser,updateUserPassword,showCurrentUser}=require('../controllers/userController');


router.get('/',getAllUsers);

module.exports=router