var cloudinary = require('cloudinary').v2;
var Gallery = require("../models/gallery.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.generateGalleryForm = function (req, res) {
    res.render("admin/form/form-gallery.ejs");
}

exports.saveGallery = function (req, res) {
    console.log("Xử lý file.");
    var gallery = new Gallery({
        name: req.body.name,
        content: req.body.content
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                gallery.thumbnail = imageUrl;
                gallery.save();
                res.redirect("/admin/gallery/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        gallery.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        gallery.save();
        res.redirect("/admin/gallery/list");
    }

}

exports.listGallery = function (req, res) {
    Gallery.find({}, function (err, list) {
        res.render("admin/table/gallery.ejs", {
            "listGallery": list
        });
    });

};
exports.generateGallery = function (req, res) {
    Gallery.find({}, function (err, list) {
        res.render("client/gallery.ejs", {
            "listGallery": list
        });
    });

};

exports.deleteGallery= function (req, res) {
    Gallery.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));
    });

};

exports.updateGallery = function (req, res) {
    Gallery.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};



