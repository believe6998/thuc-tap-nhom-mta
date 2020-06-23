const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var OrderDetailSchema = new Schema({
    OrderId: {type: String},
    packageId: {type: String},
    count: {type: String}
});

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);


