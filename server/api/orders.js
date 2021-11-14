const router = require('express').Router();
const {
  models: { Product, Order_Products, User, Order },
} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Order.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

//checks to see if user already has an open Order. If not, create one!
router.post('/users/:userId', async (req, res, next) => {
  try {
    const openOrder = await Order.findOne({
      //find the open order that matches with user id and status is open
      where: {
        status: 'open',
        userId: req.params.userId,
      },
    });
    //only get back id and email of user to set in the order object
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: ['email'],
    });
    if (!openOrder) {
      const order = await Order.create({
        status: 'open',
        totalPrice: 0,
        email: user.email,
      });
      order.setUser(req.params.userId);
      res.send(order);
    } else {
      res.send(openOrder);
    }
  } catch (err) {
    next(err);
  }
});
