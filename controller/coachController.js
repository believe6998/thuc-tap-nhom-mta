var cloudinary = require('cloudinary').v2;
var Coach = require("../models/coach.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;


exports.generateCoachForm = function (req, res) {
    res.render("admin/form/form-coach.ejs");
}

exports.saveCoach = function (req, res) {
    console.log("Xử lý file.");
    var coach = new Coach({
        name: req.body.name,
        content: req.body.content
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                coach.thumbnail = imageUrl;
                coach.save();
                res.redirect("/admin/coach/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        coach.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        coach.save();
        res.redirect("/admin/coach/list");
    }

}

exports.listCoach = function (req, res) {
    Coach.find({}, function (err, list) {
        res.render("admin/table/coach.ejs", {
            "listCoach": list
        });
    });

};


exports.generateCoach = function (req, res) {
    Coach.find({}, function (err, list) {
        res.render("client/coach.ejs", {
            "listCoach": list
        });
    });

};

exports.deleteCoach = function (req, res) {
    Coach.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));
    });

};

exports.updateCoach = function (req, res) {
    Coach.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};

