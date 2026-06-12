const express=require('express');
const router=express.Router();
const {createProduct,
  getAllProducts,
  deleteProduct,
  uploadImage,
  updateProduct,
getSingleProduct}=require('../controllers/productController');

const {authenticateUser,authorizePermissions}=require('../middleware/authentication');

const {getSingleProductReviews}=require('../controllers/reviewController');
router.get('/',getAllProducts);
router.post('/',authenticateUser,authorizePermissions('admin'),createProduct);
router.patch('/:id',authenticateUser,authorizePermissions('admin'),updateProduct);
router.delete('/:id',authenticateUser,authorizePermissions('admin'),deleteProduct);
router.post('/uploadImage',authenticateUser,authorizePermissions('admin'),uploadImage);
router.get('/:id',getSingleProduct);
router.get('/:id/reviews',getSingleProductReviews);

module.exports=router