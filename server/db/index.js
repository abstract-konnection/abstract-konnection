//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Address = require('./models/Address');
const CreditCard = require('./models/CreditCard');

//associations could go here!

module.exports = {
	db,
	models: {
		User,
		Product,
		Review,
		Address,
		CreditCard,
	},
};
