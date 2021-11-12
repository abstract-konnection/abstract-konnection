const Sequelize = require('sequelize');
const db = require('../db');

const ProductReview = db.define('product-review', {
  title: {
    type: Sequelize.STRING,
  },
  review: {
    type: Sequelize.TEXT,
  },
  publishedAt: {
    type: Sequelize.DATEONLY,
  },
});

module.exports = ProductReview;
