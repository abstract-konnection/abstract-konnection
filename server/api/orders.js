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
