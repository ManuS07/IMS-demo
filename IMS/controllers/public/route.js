const express = require('express');
const adminController = require("../admin/controllers/adminController")
// import accountController from "../public/controllers/accountController";
const router = express.Router();

//router.get('/home', accountController.getHome);
// router.get('/login', accountController.login);
// router.post('/login', accountController.loginPost);
// router.get('/admin', adminController.index);
router.get('/admin', adminController.create);
router.post('/admin', adminController.createPost);



module.exports = router
 