const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { NotFoundError } = require('../errors');
const { UnauthenticatedError } = require('../errors');
const Product = require('../models/Product');
const { checkPermissions } = require('../utils/checkPermissions');

const fakeStripeAPI = async ({ amount, currency }) => {
  const clientSecret = 'someRandomValue';

  return { clientSecret, amount };
};
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError('Please provide tax and shipping fee');
  }

  //? Convert to numbers
  const taxNum = Number(tax);
  const shippingFeeNum = Number(shippingFee);

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id:${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const amount = Number(item.amount);
    const singleOrderItem = {
      amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    //? calculate subtotal
    const itemSubtotal = amount * price;
    subtotal += itemSubtotal;
  }
  //? calculate total
  const total = subtotal + taxNum + shippingFeeNum;

  // ** creating a fake clientSecret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  //? create order
  const order = await Order.create({
    OrderItems: orderItems,
    tax: taxNum,
    shippingFee: shippingFeeNum,
    subtotal,
    total,
    user: req.user.userId,
    clientSecret: paymentIntent.clientSecret,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id: ${orderId}`);
  }

  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id: ${orderId}`);
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
