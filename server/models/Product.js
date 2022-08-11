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

    description: {
      type: String,
      required: true,
      maxLength: 200,
    },

   price: {
      type: Number,
      required: true,
    },

});
const Product = model('Product', productSchema);

module.exports = Product;