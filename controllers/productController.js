const Product = require('../models/Product');
const {StatusCodes}=require('http-status-codes');
const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
};

const getSingleProduct = async (req, res) => {
  res.send('getSingleProduct');
};
const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

const updateProduct = async (req, res) => {
  res.send('updateProduct');
};
const uploadImage = async (req, res) => {
  res.send('uploadImage');
};
const createProduct = async (req, res) => {
 
 req.body.user=req.user.userId;

  const product =await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({product});
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  uploadImage,
  updateProduct,
  getSingleProduct
}
