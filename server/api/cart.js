const router = require('express').Router();
const {
	models: { Product, Order_Products, User },
} = require('../db');
module.exports = router;

// router.put('/', async (req, res, next) => {
//     try {
//       const orderProduct = await Order_Products.findOne({
//         where: {
//           productId: req.body.productId,
//           orderId: req.body.orderId
//         }
//       })
  
//     //   const  product = await Product.findByPk({
//     //     where: {
//     //       id: req.body.productId
//     //     }
//     //   })
  
//     //   await productOrder.update({
//     //     quantity: req.body.quantity
//     //   })
  
//       res.json({productOrder, product})
//     } catch (err) {
//       next(err)
//     }
//   })
//user logs in, generate token,
 //redirect them to the main page with the products, dispatch a thunk that will make a get request to /cart and return the cart where order user:id is req.user.id, and orderStatus is incart but if nothing is returned or no order is found then we are creating an order with that userid, put in a conditional to check length of order array
 //everytime they add to cart or update quantity make 
//whether or not they are logged in they should be able to view all products on page, and view single products, as well as add items to their cart
//only once they click on proceed to checkout if they are not logged in they will be redirected to login page and then redirected to checkout page, if they are logged in staright to checkout page
//in checkout page,  
//at /cart we require token so we know which user and placed on req.user and assign to that user and use the magic method to order.adduser where userid matches req.user.id
//order.addproduct