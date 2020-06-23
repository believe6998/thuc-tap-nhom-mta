var User = require("../models/user.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;
exports.sendRegister = function (req, res) {
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        service: req.body.service,
    });
    user.save();
    res.redirect(req.get('referer'));
};

exports.listRegister = function (req, res) {
    User.find({}, function (err, list) {
        res.render("admin/table/customer.ejs", {
            "listRegister": list
        });
    });

};
exports.deleteRegister = function (req, res) {
    User.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));

    });

};

exports.updateRegister = function (req, res) {
    User.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};

