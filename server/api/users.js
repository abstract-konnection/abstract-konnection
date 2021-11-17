const router = require('express').Router();
const {
  models: { Product, Order_Products, User, Order },
} = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./gatekeeping');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//return the items in the cart so logged in user can
//have a cart that persists regardless of browser
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const openOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open',
      },
    });
    const dbCartItems = await Order_Products.findAll({
      where: {
        orderId: openOrder.id,
      },
      include: {
        model: Product,
      },
    });
    //this returns the open order with the PRODUCTS IN AN ARRAY
    res.send(dbCartItems);
  } catch (err) {
    next(err);
  }
});
