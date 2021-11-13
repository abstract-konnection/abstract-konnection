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
    Product.create({
      title: 'Helio',
      description: 'Sam Francis',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/f5e1593211bd6acf1ea5768bd4a7bfad',
    }),
    Product.create({
      title: 'A Tree in Naples',
      description: 'Willem De Kooning',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/3c6381be20d627424dbd220ff617562c',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/429090dbb913f0a5cc41cf3ec0a0d162',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/d0465b9555844595fcede97a0ce8bd2a',
    }),
    Product.create({
      title: 'Woods',
      description: 'Gerhard Richter',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/3518f6e39fbef2b9193854d70e821606',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/e8d9a9da30f988beb74a37baf2fef67f',
    }),
    Product.create({
      title: 'Composition',
      description: 'Willem de Kooning',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/d38c51f59de752d61c41647562ecd46b',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/f4da06e6c9bbee001df0067353668d44',
    }),
    Product.create({
      title: 'Ferragosto IV',
      description: 'Cy Twombly',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/1d8ce2a9fbe31d57c8745e843992f99b',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/fd967d2c84310aca4f88f6730887f570',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/a6e5119d29d7c26fc7c3c323328ed80b',
    }),
    Product.create({
      title: 'Fifty Days at Iliam. Ilians in Battle',
      description: 'Cy Twombly',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/7cd5e95ba9d5ad6fe23e216b74b87d83',
    }),
    Product.create({
      title: 'Composition bleue, taches rouge et jaune',
      description: 'Olivier Debre',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/09c2a1f9ba8a1f1d18bd15d916f1fc72',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/dfc25c43c9402f6f92fcfa45089d17fc',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/f6a463410d89e985c5ff0aed7d82ddc8',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Toddler',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/1b819f94a7c037bf861d2e3463e9f51e',
    }),
    Product.create({
      title: 'Untitled',
      description: 'Cy Twombly',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/c626a0dd73af77ca520b178b3a8fcc98',
    }),
    Product.create({
      title: 'Untitled XX',
      description: 'Willem de Kooning',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/9e40152d7e380891b12dbed8d2424e92',
    }),
    Product.create({
      title: 'Laburnum',
      description: 'Hans Hoffman',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/abfabde1be533babd2c8f7d9586eaca9',
    }),
    Product.create({
      title: 'Coffee Thyme',
      description: 'Sam Gilliam',
      price: 10,
      imageURL:
        'https://d2h3d42vkj4fuu.cloudfront.net/f5e1593211bd6acf1ea5768bd4a7bfad',
    }),
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
