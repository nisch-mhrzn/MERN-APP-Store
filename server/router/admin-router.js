const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');//verify user has token to access admin apnel
const adminMiddleware = require('../middlewares/admin-middleware');//check if they are admin
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers)
router.route("/contacts").get(authMiddleware,adminMiddleware,adminController.getAllContacts)


module.exports = router;