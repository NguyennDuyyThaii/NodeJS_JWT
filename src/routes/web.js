const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/auth')
const authController = require('./../controllers/authController')
const friendController = require('./../controllers/friendController')
let initRoutes = (app) => {
    router.post('/login', authController.login)
    router.post('/refresh-token', authController.refreshToken)
    router.use(authMiddleware.isAuth)
    router.get('/friends', friendController.friendLists)
    return app.use('/', router)
}
module.exports = initRoutes