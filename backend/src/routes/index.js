import express from 'express'
import authMiddleware from '../middleware/auth'
import AccountController from '../controllers/AccountController'

const router = express.Router()

router.post('/v1/signup', AccountController.signup)
router.post('/v1/login', AccountController.login)

router.use(authMiddleware)

// routes that should be protected must be bellow authMiddleware

export default router
