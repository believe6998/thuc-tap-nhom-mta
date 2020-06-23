const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var packageSchema = new Schema({
    thumbnail: {type: String},
    price: {type: String},
    name: {type: String},
    category:  {type: String}
});

module.exports = mongoose.model("Package", packageSchema);
