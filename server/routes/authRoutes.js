// const express = require("express");
// var initial = require("../controllers/initial");
// var { getChangePassword, postChangePassword, changeDetails } = require("../controllers/changePassword");
// var getHome = require("../controllers/home");
// var { getLogin, postLogin, postLoginMobile } = require("../controllers/login");
// var { logOut } = require("../controllers/logout");
// var { postPassword, getPassword } = require("../controllers/password");
// var { qr, scan } = require("../controllers/qr");
// var { reset, postReset } = require("../controllers/reset");
// var { verificate, postVerificate } = require("../controllers/verification");
// var { auth, authCallBack } = require("../controllers/googleAuthentication");
// var { passport } = require("../config/passport");
// var { getSignIn, postSignIn } = require("../controllers/signin");
// var { menu, addClass, deleteClass } = require("../controllers/menu");

// const router = express.Router();

// router.get("/", initial);

// router.get("/home", getHome);

// router.get("/verificate/:token", verificate);

// router.get("/login", getLogin);
// router.post("/login", postLogin);
// router.post("/mobile/login", postLoginMobile);

// router.get("/signin", getSignIn);
// router.post("/signin", postSignIn);

// router.get("/logout", logOut);

// router.get("/password", getPassword);
// router.post("/password", postPassword);

// router.get("/reset/:token", reset);
// router.post("/reset/:token", postReset);

// router.get("/changePassword", getChangePassword);
// router.post("/changePassword", postChangePassword);

// router.get("/menu", menu);
// router.post("/menu", addClass);

// router.post('/scan', scan);
// router.post('/delete', deleteClass)
// router.post('/changeDetails', changeDetails);
// router.get("/qr/:qr", qr);

// module.exports = router;