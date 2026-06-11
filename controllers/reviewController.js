const Review = require('../models/Review');
const Product = require('../models/Product');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { authorizePermissions } = require('../middleware/authentication');
const { checkPermissions } = require('../utils/checkPermissions');

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  if(!productId) throw new BadRequestError("Please provide product id");

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id:${productId}`);
  }

//   ? check if user has already submitted a review
  const alreadySubmitted=await Review.findOne({product:productId,user:req.user.userId});
  if(alreadySubmitted){
    throw new BadRequestError("You have already submitted a review for this product");
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId }).populate({
    path: 'product',
    select: 'name company price',
});
  if (!review) {
    throw new NotFoundError(`No review with id:${reviewId}`);
  }
 return  res.status(StatusCodes.OK).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name company price',
  });
 return  res.status(StatusCodes.OK).json({ reviews });
};
const updateReview = async (req, res) => {
  const {id:reviewId}=req.params;

  if(!reviewId){
    throw new BadRequestError("Please provide review id");
  }
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id:${reviewId}`);
  }
checkPermissions(req.user,review.user);
const updatedReview=await Review.findOneAndUpdate({_id:reviewId},req.body,{new:true,runValidators:true});
return res.status(StatusCodes.OK).json({updatedReview});

};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  if(!reviewId){
    throw new BadRequestError("Please provide review id");
  }

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id:${reviewId}`);
  }
  checkPermissions(req.user,review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'review deleted' });
};
module.exports = {
  createReview,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
