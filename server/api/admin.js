const router = require('express').Router();
const {
	models: { Product, User, Order },
} = require('../db');
module.exports = router;

const { requireToken, isAdmin } = require('./gatekeeping');

router.post('/products', isAdmin, async (req, res, next) => {
	try {
		res.status(201).send(await Product.create(req.body));
	} catch (error) {
		next(error);
	}
});

router.put('/products/:id', isAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		res.send(await product.update(req.body));
	} catch (error) {
		next(error);
	}
});

router.delete('/products/:id', isAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		await product.destroy();
		res.send(project);
	} catch (error) {
		next(error);
	}
});

router.put('/users/:id', isAdmin, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.send(await user.update(req.body));
	} catch (error) {
		next(error);
	}
});
