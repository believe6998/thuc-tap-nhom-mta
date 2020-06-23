const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    // id: {type: String},
    customerName: {type: String},
    customerPhone: {type: String},
    totalPrice: {type: String},
    createdAt: [Date]
});

module.exports = mongoose.model("Order", OrderSchema);


