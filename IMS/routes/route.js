const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();




router.get('/login',controller.login)
router.get('/getMark',controller.getmark)
router.get('/getToken',controller.viewStudentDetails)
router.get('/update',controller.update)
router.get('/feedback',controller.viewFeedback)






module.exports = router;