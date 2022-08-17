const db = require('../config/connection');
const { User, Product, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  try {
    //Delete
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    //Create
    await User.create(userSeeds);

    const response = await Category.create(categorySeeds);
    const categoryId = response[1]._id.toString();
    var newProductSeeds = productSeeds;
    for (let index = 0; index < newProductSeeds.length; index++) {
      var tempProduct = newProductSeeds[index];
      tempProduct.categoryId = categoryId;
      newProductSeeds[index] = tempProduct;
    }
    
    await Product.create(newProductSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }




  console.log('all done!');
  process.exit(0);
});
