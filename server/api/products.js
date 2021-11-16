const router = require('express').Router();
const {
	models: { Product, findAll },
} = require('../db');
module.exports = router;


router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAndCountAll();
		res.json(products);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		res.json(await Product.findByPk(req.params.id));

	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const product = Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
	} catch (error) {
		next(error);
	}
});
