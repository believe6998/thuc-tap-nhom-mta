const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tidingSchema = new Schema({
    thumbnail: {type: String},
    content:{type:String},
});

module.exports = mongoose.model("Tiding", tidingSchema);
