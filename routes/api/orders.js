const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const auth = require('../../middleware/auth');
const config = require('config');

// @route    POST api/orders
// @desc     Add to order
// @access   Private
router.post(
  '/',
  async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    
    // build order object
    const orderFields = {};
    if (orderItems) orderFields.orderItems = orderItems;
    if (shippingAddress) orderFields.shippingAddress = shippingAddress;
    if (paymentMethod) orderFields.paymentMethod = paymentMethod;
    if (itemsPrice) orderFields.itemsPrice = itemsPrice;
    if (taxPrice) orderFields.taxPrice = taxPrice;
    if (shippingPrice) orderFields.shippingPrice = shippingPrice;
    if (totalPrice) orderFields.totalPrice = totalPrice;

    try{
      // create
      const order = new Order(orderFields);
      await order.save();
      return res.json(order);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/orders/order/:id
// @desc     Get order by Id
// @access   Private
router.get('/order/:id', async (req, res) => {
  try{
    const order = await Order.findById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/orders/order/:id/pay
// @desc     Mark payment on order by Id
// @access   Private
router.post('/order/:id/pay', async (req, res) => {
  try{
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/orders/order/:id/deliver
// @desc     Mark delivery on order by Id
// @access   Private
router.post('/order/:id/deliver', async (req, res) => {
  try{
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET /api/orders/myorders
// @desc     Get advertised beautician/stylist orders
// @access   Private

router.get('/myorders', auth, async (req, res) => {
  try{
    const orders = await Order.find({ orderItems: {$elemMatch: {agent: req.user.id }}});
    if(orders){
      res.json(orders);
    } else {
      res.status(404);
      throw new Error('Orders not found');
    }
  } catch (err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route    GET api/orders/config/paypal
// @desc     Get paypal client Id
// @access   Private

router.get('/config/paypal', async (req, res) => {
  res.send(config.get('paypalClientID'));
});

module.exports = router;
