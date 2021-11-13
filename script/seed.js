'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      email: 'cody@cody.com',
      firstName: 'Cody',
      lastName: 'Smith',
      admin: false,
    }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@murphy.com',
      firstName: 'Murphy',
      lastName: 'Smith',
      admin: true,
    }),
    User.create({
      username: 'weston',
      password: '123',
      email: 'weston@weston.com',
      firstName: 'Weston',
      lastName: 'Kai',
      admin: false,
    }),
    User.create({
      username: 'grace',
      password: '123',
      email: 'grace@grace.com',
      firstName: 'Grace',
      lastName: 'Shopper',
      admin: true,
    }),
    User.create({
      username: 'tanner',
      password: '123',
      email: 'tanner@tanner.com',
      firstName: 'Tanner',
      lastName: 'Goods',
      admin: false,
    }),
  ]);

  //Creating products
  const product = await Promise.all([
    Product.create({ title: 'test1', price: 10 }),
    Product.create({ title: 'test2', price: 10 }),
    Product.create({ title: 'test3', price: 10 }),
    Product.create({ title: 'test4', price: 10 }),
    Product.create({ title: 'test5', price: 10 }),
    Product.create({ title: 'test6', price: 10 }),
    Product.create({ title: 'test7', price: 10 }),
    Product.create({ title: 'test8', price: 10 }),
    Product.create({ title: 'test9', price: 10 }),
    Product.create({ title: 'test10', price: 10 }),
    Product.create({ title: 'test11', price: 10 }),
    Product.create({ title: 'test12', price: 10 }),
    Product.create({ title: 'test13', price: 10 }),
    Product.create({ title: 'test14', price: 10 }),
    Product.create({ title: 'test15', price: 10 }),
    Product.create({ title: 'test16', price: 10 }),
    Product.create({ title: 'test17', price: 10 }),
    Product.create({ title: 'test18', price: 10 }),
    Product.create({ title: 'test19', price: 10 }),
    Product.create({ title: 'test20', price: 10 }),
  ]);

  console.log(`seeded ${users.length} users and ${product.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
