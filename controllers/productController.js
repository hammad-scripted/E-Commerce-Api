const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  console.log('getAllProducts');
};

const getSingleProduct = async (req, res) => {
  console.log('getSingleProduct');
};
const deleteProduct = async (req, res) => {
  console.log('deleteProduct');
};

const updateProduct = async (req, res) => {
  console.log('updateProduct');
};
const uploadImage = async (req, res) => {
  console.log('uploadImage');
};
const createProduct = async (req, res) => {
  console.log('createProduct');
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  uploadImage,
  updateProduct,
  getSingleProduct
}
