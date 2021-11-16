const Sequelize = require('sequelize');
const db = require('../db');
const Op = db.Sequelize.Op;
const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Lorem ipsum',
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 2,
    validate: {
      min: 0,
    },
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_2/cdn/32a84740-90f5-4484-8d13-3a14ec1c9d04/a8fa06c1-3205-4792-ac8f-8e1d969d865f.jpg',
  },
});

// Properties of Sequelize.findAndCountAll():
// limit: quantity of items to fetch.
// offset: quanitity of items to skip - if defined skips then uses limit value.
// If the client does not specify which page or the size of page we set a default.
const getPagination = (page, size) => {
	const limit = size ? + size : 3;
	const offset = page ? page * limit : 0;

	return { limit, offset };
}

//
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? + page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

exports.findAll = async (req, res, next) => {
  const { page, size, title } = req.query;
  let condition = title ? { title: { [Op.like]: '%$[title]%' } } : null;

  const { limit, offset } = getPagination(page, size);

  const productData = await Product.findAndCountAll({ where: condition, limit, offset });
  const response = getPagingData(productData, page, limit);
  return response;
}


module.exports = Product;
