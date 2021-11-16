const router = require('express').Router();
const {
  models: { Product, Order_Products, User, Order },
} = require('../db');
module.exports = router;

//pair product to the right cart
router.post('/:orderId/:productId', async (req, res, next) => {
  try {
    //cartItem already exists in table, so we are probably updating amount
    const alreadyInCart = await Order_Products.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const order = await Order.findByPk(req.params.orderId);
    if (!alreadyInCart) {
      const orderProduct = await Order_Products.create(req.body);
      order.update({ totalPrice: order.totalPrice + orderProduct.totalPrice });
      res.send(orderProduct);
    } else {
      //to calculate the updated totalPrice in the order model
      //i need to get the price of an existing product before amount gets updated
      const oldProductTotalPrice = alreadyInCart.totalPrice;
      await alreadyInCart.update(req.body);
      order.update({
        totalPrice:
          order.totalPrice + alreadyInCart.totalPrice - oldProductTotalPrice,
      });
      res.send(alreadyInCart);
    }
  } catch (err) {
    next(err);
  }
});
