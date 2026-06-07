const express=require('express');
const router=express.Router();
const {createProduct,
  getAllProducts,
  deleteProduct,
  uploadImage,
  updateProduct,
getSingleProduct}=require('../controllers/productController');


router.get('/',getAllProducts);
router.post('/',createProduct);
router.patch('/:id',updateProduct);
router.delete('/:id',deleteProduct);
router.post('/uploadImage',uploadImage);
router.get('/:id',getSingleProduct);

module.exports=router