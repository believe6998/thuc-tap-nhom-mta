const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var coachSchema = new Schema({
    thumbnail: {type: String},
    name: {type: String},
    content:{type:String},
});

module.exports = mongoose.model("Coach", coachSchema);
