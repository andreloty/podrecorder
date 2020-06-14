const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')
const userController = require('../controller/userController')
const recordingController = require('../controller/recordingController')

// root
router.get('/', homeController.index)

// user
router.post('/api/v1/signup', userController.signup)
router.post('/api/v1/login', userController.login)

// recording
router.get('/api/v1/recording/new', recordingController.newRecording)

module.exports = router
