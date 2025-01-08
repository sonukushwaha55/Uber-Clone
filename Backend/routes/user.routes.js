const express = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user.controller.js')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js')

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Firstname must have more than 3 character long"),
    body('password').isLength({min:6}).withMessage("Password must have more than 6 character long")
],
userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must have 6 character")
],
userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;
