var homeController = require("../controller/homeController.js");
var fitnessController = require("../controller/fitnessController.js");
var groupexController = require("../controller/groupexController.js");
var kickFitController = require("../controller/kickFitController.js");
var swimController = require("../controller/swimController.js");
var yogaController = require("../controller/yogaController.js");
var membershipController = require("../controller/membershipController.js");
var galleryController = require("../controller/galleryController.js");
var coachController = require("../controller/coachController.js");
var newsController = require("../controller/newsController.js");
var aboutUsController = require("../controller/aboutUsController.js");
var userController = require("../controller/userController.js");
var adminController = require("../controller/adminController.js");
var packageController = require("../controller/packageController.js");


exports.routing = function (app) {
    // client
    app.get("/home", homeController.generateHome);
    app.get("/fitness", fitnessController.generateFitness);
    app.get("/group-ex", groupexController.generateGroupex);
    app.get("/kick-fit", kickFitController.generateKickfit);
    app.get("/swim", swimController.generateSwim);
    app.get("/yoga", yogaController.generateYoga);
    app.get("/membership", membershipController.generateMembership);
    app.get("/gallery", galleryController.generateGallery);
    app.get("/coach", coachController.generateCoach);
    app.get("/news/:page", newsController.generateNews);
    app.get("/about-us", aboutUsController.generateAboutus);
    app.get("/package", packageController.generatePackage);
    app.get("/package/yoga", packageController.generatePackageYoga);
    app.get("/package/swim", packageController.generatePackageSwim);
    app.get("/package/fitness", packageController.generatePackageFitness);
    app.get("/package/group-ex", packageController.generatePackageGroup);
    app.get("/package/kick-fit", packageController.generatePackageKickfit);
    app.get("/cart", packageController.generateCart);

    //admin
    app.get("/admin", adminController.generateAdmin);

    // customer
    app.post("/register/send", userController.sendRegister);
    app.get("/admin/register/list", userController.listRegister);

    app.get("/admin/register/:id/delete", userController.deleteRegister);
    app.post("/admin/register/:id/update", userController.updateRegister);




    //news
    app.get("/admin/news/list", newsController.listNews);
    app.get("/admin/news/form", newsController.generateNewsForm);
    app.post("/admin/news/save", newsController.saveNews);
    app.get("/admin/news/:id/delete", newsController.deleteNews);
    app.post("/admin/news/:id/update", newsController.updateNews);

    //gallery
    app.get("/admin/gallery/list", galleryController.listGallery);
    app.get("/admin/gallery/form", galleryController.generateGalleryForm);
    app.post("/admin/gallery/save", galleryController.saveGallery);
    app.get("/admin/gallery/:id/delete", galleryController.deleteGallery);
    app.post("/admin/gallery/:id/update", galleryController.updateGallery);

    //coachs
    app.get("/admin/coach/list", coachController.listCoach);
    app.get("/admin/coach/form", coachController.generateCoachForm);
    app.post("/admin/coach/save", coachController.saveCoach);
    app.get("/admin/coach/:id/delete", coachController.deleteCoach);
    app.post("/admin/coach/:id/update", coachController.updateCoach);

    //package
    app.get("/admin/package/list", packageController.listPackage);
    app.get("/admin/package/form", packageController.generatePackageForm);
    app.post("/admin/package/save", packageController.savePackage);
    app.get("/admin/package/:id/delete", packageController.deletePackage);
    app.post("/admin/package/:id/update", packageController.updatePackage);
    app.post("/cart/complete", packageController.complete);
    app.get("/admin/order/list", packageController.listOrder);
    app.get("/admin/order-detail/list", packageController.listOrderDetail);

}