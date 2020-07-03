const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const homeController = require('../controller/homeController')
const userController = require('../controller/userController')
const recordingController = require('../controller/recordingController')
const userService = require('../services/UserService')

function verifyJWT (req, res, next) {
  try {
    var token = userService.getTokenFromAuthorizationHeader(req.headers['authorization'])
    if (!token) return res.status(401).send({ auth: false, message: 'Token não fornecido.' })

    jwt.verify(token, process.env.MY_SECRET, function (err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).send({ auth: false, message: 'Token não fornecido.' })
  }
}

// root
router.get('/', homeController.index)

// user
router.post('/api/v1/signup', userController.signup)
router.post('/api/v1/login', userController.login)

// recording
router.get('/api/v1/recording/new', verifyJWT, recordingController.newRecording)
router.get('/api/v1/recording/session', recordingController.session)
router.post('/api/v1/recording/validate-session', recordingController.validateSession)

module.exports = router
