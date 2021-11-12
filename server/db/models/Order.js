const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: Sequelize.ENUM('in-cart', 'processed'),
    defaultValue: 'in-cart',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Order;
