const Review = require('../models/Review');
const Product = require('../models/Product');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { authorizePermissions } = require('../middleware/authentication');
const { checkPermissions } = require('../utils/checkPermissions');

const createReview = async (req, res) => {
  const { productId: productId } = req.params;
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id:${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews });
};
const updateReview = async (req, res) => {
  res.send('update review');
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id:${reviewId}`);
  }
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
