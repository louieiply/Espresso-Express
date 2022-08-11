const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    
   addressLine1: {
      type: String,
      required: true,
      maxLength: 200,
      
    },
    addressLine2: {
        type: String,
        required: false,
        maxLength: 200,
        
      },
   suburb: {
      type: String,
      required: true,
      maxLength: 200,
    },
    country: {
      type: String,
      required: true,
     maxLength: 200,
    },
    postcode: {
        type: String,
        required: true,
       maxLength: 200,
      }
});

const Address = model('Address', addressSchema);
module.exports = Address;