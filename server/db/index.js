//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Address = require('./models/Address');
const CreditCard = require('./models/CreditCard');
const Order = require('./models/Order');
const Order_Products = require('./models/OrderProducts');

//associations could go here!

//user and order (1:m)
Order.belongsTo(User);
User.hasMany(Order);

//super many-to many order and product
Order.belongsToMany(Product, { through: Order_Products });
Product.belongsToMany(Order, { through: Order_Products });

Order.hasMany(Order_Products);
Order_Products.belongsTo(Order);

Product.hasMany(Order_Products);
Order_Products.belongsTo(Product);

//product and review (1:M)
Product.hasMany(Review);
Review.belongsTo(Product);

//user and review (1:M)
User.hasMany(Review);
Review.belongsTo(User);

//user and credit card (1:1)
User.hasMany(CreditCard);
CreditCard.belongsTo(User);

//order and creditcard (1:1)
Order.hasOne(CreditCard);
CreditCard.belongsTo(Order);

//order and address (1:1)
Order.hasOne(Address);
Address.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    Address,
    CreditCard,
    Order,
    Order_Products,
  },
};