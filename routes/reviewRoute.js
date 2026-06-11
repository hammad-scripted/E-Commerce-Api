const express=require('express');
const router=express.Router();  
const {authenticateUser}=require('../middleware/authentication');
const {createReview,getSingleReview,getAllReviews,updateReview,deleteReview}=require('../controllers/reviewController');    

router.post('/',authenticateUser,createReview);
router.get('/',getAllReviews);
router.get('/:id',getSingleReview);
router.patch('/:id',authenticateUser,updateReview);
router.delete('/:id',authenticateUser,deleteReview);

module.exports=router