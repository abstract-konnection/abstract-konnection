const router = require('express').Router();
const {
	models: { Product, findAll },
} = require('../db');
module.exports = router;

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

//
const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: products } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, products, totalPages, currentPage };
};

router.get('/', async (req, res, next) => {
	try {
		const { page, size, artist } = req.query;
		const { limit, offset } = getPagination(page, size);

		const products = await Product.findAndCountAll({ limit, offset });
		const response = getPagingData(products, page, limit);
		res.json(response);
	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		res.json(await Product.findAll());
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
