var cloudinary = require('cloudinary').v2;
var Tiding = require("../models/news.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;


exports.generateNewsForm = function (req, res) {
    res.render("admin/form/form-news.ejs");
}

exports.saveNews = function (req, res) {
    console.log("Xử lý file.");
    var tiding = new Tiding({
        content: req.body.content
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                tiding.thumbnail = imageUrl;
                tiding.save();
                res.redirect("/admin/news/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        tiding.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        tiding.save();
        res.redirect("/admin/news/list");
    }

}

exports.listNews = function (req, res) {
    Tiding.find({}, function (err, list) {
        res.render("admin/table/news.ejs", {
            "listTiding": list
        });
    });
};

exports.generateNews = function (req, res, next) {
    var perPage = 6
    var page = req.params.page || 1
    Tiding
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, list) {
            Tiding.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('client/news.ejs', {
                    "listTiding": list,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
};

exports.deleteNews = function (req, res) {
    Tiding.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));
    });

};

exports.updateNews = function (req, res) {
    Tiding.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};


