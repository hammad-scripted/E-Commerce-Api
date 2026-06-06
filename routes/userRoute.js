const express=require('express');
const router=express.Router();
const {authenticateUser}=require('../middleware/authentication');

const {getAllUsers,getSingleUser,updateUser,updateUserPassword,showCurrentUser}=require('../controllers/userController');


router.get('/',authenticateUser,getAllUsers);
router.get('/:id',getSingleUser);
router.get('/showMe',showCurrentUser);
router.patch('/updateUser',updateUser);
router.patch('/updateUserPassword',updateUserPassword);

module.exports=router