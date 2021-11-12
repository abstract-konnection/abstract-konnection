const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
	title: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	review: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	publishedAt: {
		type: Sequelize.DATEONLY,
		defaultValue: Sequelize.NOW,
	},
});

module.exports = Review;
