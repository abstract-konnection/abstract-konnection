const Sequelize = require('sequelize');
const db = require('../db');

const today = new Date();

const ProductReview = db.define('product-review', {
  title: {
    type: Sequelize.STRING,
  },
  review: {
    type: Sequelize.TEXT,
  },
  publishedAt: {
    type: Sequelize.DATEONLY,
    defaultValue:
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate(),
  },
});

module.exports = ProductReview;
