const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

// root
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// user
router.post('/api/v1/signup', userController.signup)
router.post('/api/v1/login', userController.login)

module.exports = router
