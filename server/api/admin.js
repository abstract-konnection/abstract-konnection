const router = require('express').Router();
const {
	models: { Product, User, Order },
} = require('../db');
module.exports = router;

const { requireToken, isAdmin } = require('./gatekeeping');

router.post('/products', requireToken, isAdmin, async (req, res, next) => {
	try {
		res.status(201).send(await Product.create(req.body));
	} catch (error) {
		next(error);
	}
});

router.put('/products/:id', requireToken, isAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		res.send(await product.update(req.body));
	} catch (error) {
		next(error);
	}
});

router.delete(
	'/products/:id',
	requireToken,
	isAdmin,
	async (req, res, next) => {
		try {
			const product = await Product.findByPk(req.params.id);
			await product.destroy();
			res.send(project);
		} catch (error) {
			next(error);
		}
	}
);

router.get('/orders', requireToken, isAdmin, async (req, res, next) => {
	try {
		res.json(await Order.findAll());
	} catch (error) {
		next(error);
	}
});


