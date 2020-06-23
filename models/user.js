const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String},
    phone:{type:String},
    email: {type:String},
    address: {type:String},
    service: {type:String},
});

module.exports = mongoose.model("User", userSchema);
