const router = require('express').Router();
const {
  models: { Product, Order_Products, User, Order },
} = require('../db');
module.exports = router;

//return the items in the cart so logged in user can
//have a cart that persists regardless of browser
router.get('/:userId', async (req, res, next) => {
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
    });
    console.log('i am getting all cart items from cart.js', dbCartItems);
    res.send(dbCartItems);
  } catch (err) {
    next(err);
  }
});

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

//user logs in, generate token,
//redirect them to the main page with the products, dispatch a thunk that will make a get request to /cart and return the cart where order user:id is req.user.id, and orderStatus is incart but if nothing is returned or no order is found then we are creating an order with that userid, put in a conditional to check length of order array
//everytime they add to cart or update quantity make
//whether or not they are logged in they should be able to view all products on page, and view single products, as well as add items to their cart
//only once they click on proceed to checkout if they are not logged in they will be redirected to login page and then redirected to checkout page, if they are logged in staright to checkout page
//in checkout page,
//at /cart we require token so we know which user and placed on req.user and assign to that user and use the magic method to order.adduser where userid matches req.user.id
//order.addproduct
