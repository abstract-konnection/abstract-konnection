const Sequelize = require('sequelize');
const db = require('../db');

const CreditCard = db.define('creditCard', {
	cardNumber: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isCreditCard: true,
			notEmpty: true,
		},
	},
	Name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	CCV: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	expDate: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	isPreferred: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
});

module.exports = CreditCard;
