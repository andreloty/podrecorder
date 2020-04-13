import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'

// routes import
import indexRouter from './routes/index'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class App {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(logger('dev'))
  }

  routes() {
    this.express.use(indexRouter)
  }
}

export default new App().express
