import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    shippingPrice,
    taxPrice,
    totalPrice,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No ordered items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderItems,
      shippingPrice,
      taxPrice,
      totalPrice,
      itemsPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) res.status(201).json(order);
  else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.status(201).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});
export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };