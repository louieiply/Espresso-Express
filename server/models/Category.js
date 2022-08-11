const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    
    categoryName: {
      type: String,
      required: true,
      maxLength: 200,
    },
    description: {
        type: String,
        required: false,
        maxLength: 200,
      },
   
});

const Category = model('Category',categorySchema);
module.exports = Category;