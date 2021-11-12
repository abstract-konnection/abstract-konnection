const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
	address: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	defaultBilling: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	defaultShipping: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
		},
	},
});

module.exports = Address;
