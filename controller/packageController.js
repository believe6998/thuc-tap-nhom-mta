var cloudinary = require('cloudinary').v2;
var Package = require("../models/package.js");
var Order = require("../models/order.js");
var OrderDetail = require("../models/order-detail.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;
exports.generatePackageForm = function (req, res) {
    res.render("admin/form/form-package.ejs");
}

exports.savePackage = function (req, res) {
    console.log("Xử lý file.");
    var package = new Package({
        price: req.body.price,
        name: req.body.name,
        category: req.body.category,
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                package.thumbnail = imageUrl;
                package.save();
                res.redirect("/admin/package/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        package.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        package.save();
        res.redirect("/admin/package/list");
    }

}

exports.listPackage = function (req, res) {
    Package.find({}, function (err, list) {
        res.render("admin/table/package.ejs", {
            "listPackage": list
        });
    });

};
exports.generatePackage = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Fitness' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};

exports.generatePackageYoga = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Yoga' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};

exports.generatePackageSwim = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Swim' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};

exports.generatePackageFitness = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Fitness' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};
exports.generatePackageKickfit = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Kickfit' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};
exports.generatePackageGroup = function (req, res) {
    Package.find({'category': new RegExp('^' + 'Group-Ex' + '$', "i")}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};

exports.deletePackage = function (req, res) {
    Package.findByIdAndRemove(myid(req.params.id), function (err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));
    });

};

exports.updatePackage = function (req, res) {
    Package.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect(req.get('referer'));
        }
    });
};

exports.generateCart = function (req, res) {
    Package.find({}, function (err, list) {
        res.render("client/cart.ejs", {
            "listPackage": list
        });
    });
};

exports.complete = function (req, res) {
    console.log("Complete order." + JSON.stringify(req.body));
    var order = new Order({
        id: 'ORDER_' + new Date().getTime() + makeid(),
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        totalPrice: req.body.totalPrice,
        createdAt: new Date()
    });
    for (var key in req.body) {
        var orderDetail = new OrderDetail({
            orderId: order.id,
            packageId: key,
            count: req.body[key].count
        });
        console.log(key);
        console.log(orderDetail.count);
        orderDetail.save();
    }
    order.save();
    res.send(JSON.stringify(req.body));
}


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.listOrder = function (req, res) {
    Order.find({}, function (err, list) {
        res.render("admin/table/order.ejs", {
            "listOrder": list
        });
    });

};

exports.listOrderDetail = function (req, res) {
    OrderDetail.find({}, function (err, list) {
        res.render("admin/table/order-detail.ejs", {
            "listOrderDetail": list
        });
    });

};


