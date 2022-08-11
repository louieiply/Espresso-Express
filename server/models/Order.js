const { Schema, model } = require('mongoose');

const orderSchema = new Schema({

    purchaseDate: {
        type: Date,
        default: Date.now(),
        required: true,

    },
    description: {
        type: String,
        required: true,
        maxLength: 200,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
    }
],
    totalPrice: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Order = model('Order', orderSchema);

module.exports = Order;
