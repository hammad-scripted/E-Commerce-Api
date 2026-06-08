const Product = require('../models/Product');
const {StatusCodes}=require('http-status-codes');
const {NotFoundError}=require('../errors'); 
const {BadRequestError}=require('../errors');
const cloudinary=require('../utils/cloudinary');
const getAllProducts = async (req, res) => {
 
  const products=await Product.find({});
 return  res.status(StatusCodes.OK).json({products,count:products.length});
};

const getSingleProduct = async (req, res) => 
  {
const {id:productId}=req.params;
const product=await Product.findOne({_id:productId});
if(!product){
  throw new NotFoundError(`No product with id:${productId}`);
}
return res.status(StatusCodes.OK).json({product});
};
const deleteProduct = async (req, res) => {
 const {id:productId}=req.params;
//  const deletedProduct=await Product.deleteOne({_id:id});
//  if(!deletedProduct){
//   throw new NotFoundError(`No product with id:${productId}`);
//  }
//  return res.status(StatusCodes.DELETED).json({"msg":"product deleted"});

// ? second approach
const product=await Product.findOne({_id:productId});
if(!product){
  throw new NotFoundError(`No product with id:${productId}`);
}
await product.remove();
return res.status(StatusCodes.OK).json({"msg":"product deleted"});
};

const updateProduct = async (req, res) => {
  req.body.user=req.user.userId;
  const {id:productId}=req.params;
  const updatedProduct=await Product.findOneAndUpdate({_id:productId},req.body,{new:true,runValidators:true});
  if(!updatedProduct){
    throw new NotFoundError(`No product with id:${productId}`)}
 return res.status(StatusCodes.OK).json({updatedProduct});
};
const uploadImage = async (req, res) => {

  if (!req.files || !req.files.image) {
    throw new BadRequestError('No file uploaded');
  }

  const file = req.files.image;

  if (!file.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image file');
  }

  const result = await cloudinary.uploader.upload(
    file.tempFilePath,
    {
      folder: 'products',
    }
  );

  return res.status(StatusCodes.OK).json({
    success: true,

    image: {
      src: result.secure_url,
      public_id: result.public_id,
    },
  });
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

