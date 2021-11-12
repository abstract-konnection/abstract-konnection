const Sequelize = require('sequelize');
const db = require('../db');

const Order_Products = db.define('order_products', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Order_Products;
