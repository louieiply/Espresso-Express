const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    categoryId: {
        
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      maxLength: 300,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0
    },
    price: {
      type: Number,
      required: true,
    },

});
const Product = model('Product', productSchema);

module.exports = Product;