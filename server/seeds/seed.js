const db = require('../config/connection');
const { User, Product, Category } = require('../models');
const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const milkSeeds = require('./milkSeeds.json')
const cupsSeeds = require('./cupsSeeds.json')
const grinderSeeds = require('./grinderSeeds.json');
const machineSeeds = require('./machineSeeds.json');
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

    const milkcateId = response[0]._id.toString();
    var newMilkProductSeeds = milkSeeds;
    for (let index = 0; index < newMilkProductSeeds.length; index++) {
      var tempProduct = newMilkProductSeeds[index];
      tempProduct.categoryId = milkcateId;
      newMilkProductSeeds[index] = tempProduct;
    }
    
    await Product.create(newMilkProductSeeds);

    
    const cupcateId = response[3]._id.toString();
    var newCupProductSeeds = cupsSeeds;
    for (let index = 0; index < newCupProductSeeds.length; index++) {
      var tempProduct = newCupProductSeeds[index];
      tempProduct.categoryId = cupcateId;
      newCupProductSeeds[index] = tempProduct;
    }
    await Product.create(newCupProductSeeds);

    const grindercateId = response[2]._id.toString();
    var newGrinderProductSeeds = grinderSeeds;
    for (let index = 0; index < newGrinderProductSeeds.length; index++) {
      var tempProduct = newGrinderProductSeeds[index];
      tempProduct.categoryId = grindercateId;
      newGrinderProductSeeds[index] = tempProduct;
    }
    await Product.create(newGrinderProductSeeds);

    const machinecateId = response[4]._id.toString();
    var newMachineProductSeeds = machineSeeds;
    for (let index = 0; index < newMachineProductSeeds.length; index++) {
      var tempProduct = newMachineProductSeeds[index];
      tempProduct.categoryId = machinecateId;
      newMachineProductSeeds[index] = tempProduct;
    }
    await Product.create(newMachineProductSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }




  console.log('all done!');
  process.exit(0);
});
