const router = require('express').Router();
const {
  models: { Product, Order_Products, User, Order },
} = require('../db');
module.exports = router;
const { requireToken } = require('./gatekeeping');

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Order.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

//checks to see if user already has an open Order. If not, create one!
router.post('/users/:userId', requireToken, async (req, res, next) => {
  try {
    const openOrder = await Order.findOne({
      //find the open order that matches with user id and status is open
      where: {
        status: 'open',
        userId: req.params.userId,
      },
    });
    /* checks if the user on token matches the user param before
    creating cart */
    if (req.user.id === Number(req.params.userId)) {
      if (!openOrder) {
        //only get back email of user to associate with order
        const user = await User.findOne({
          where: {
            id: req.params.userId,
          },
          attributes: ['email'],
        });
        const order = await Order.create({
          status: 'open',
          totalPrice: 0,
          email: user.email,
        });
        // order.setUser(req.params.userId);
        res.send(order);
      } else {
        res.send(openOrder);
      }
    } else {
      res.status(403).send('You are not the user associated with this cart');
    }
  } catch (err) {
    next(err);
  }
});

// router.put('/users/:userId', requireToken, async (req, res, next) => {
//     try {
//       const order = await Order.findOne({
//         //find the open order that matches with user id and status is open
//         where: {
//           status: 'open',
//           userId: req.params.userId,
//         },
//       });
//       /* checks if the user on token matches the user param before
//       creating cart */
//       if (req.user.id === Number(req.params.userId)) {
//         if (!openOrder) {
//           //only get back email of user to associate with order
//           const user = await User.findOne({
//             where: {
//               id: req.params.userId,
//             },
//             attributes: ['email'],
//           });
//           const order = await Order.create({
//             status: 'open',
//             totalPrice: 0,
//             email: user.email,
//           });
//           order.setUser(req.params.userId);
//           res.send(order);
//         } else {
//           res.send(openOrder);
//         }
//       } else {
//         res.status(403).send('You are not the user associated with this cart');
//       }
//     } catch (err) {
//       next(err);
//     }
//   });
