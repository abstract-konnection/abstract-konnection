const Sequelize = require('sequelize');
const db = require('../db');

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
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Lorem ipsum',
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 2,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_2/cdn/32a84740-90f5-4484-8d13-3a14ec1c9d04/a8fa06c1-3205-4792-ac8f-8e1d969d865f.jpg',
  },
});

module.exports = Product;
