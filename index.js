const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const favicon = require('express-favicon');
var ejs = require('ejs');

const app = express();

mongoose.connect(
    'mongodb://admin:admin123@ds015892.mlab.com:15892/project-sem-1',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
cloudinary.config({
    cloud_name: 'namphth1807043',
    api_key: '177312665915999',
    api_secret: 'LwAqts8hhL_fwXI-vCH8BbHNWcI'
});

app.use(favicon(__dirname + '/public/favicon.png'));
app.set("views", "views");
app.set("views engine", "ejs");
app.use(fileUpload());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

// Tách phần xử lý chức năng routing ra một file bên ngoài.
var router = require("./router/applicationRouter.js");
router.routing(app);

app.listen(9999, function () {
    console.log("Chay thanh cong tren port " + 9999);
});
