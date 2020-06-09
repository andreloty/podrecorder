const app = require('../../src/app')
const request = require('supertest')(app)
const knex = require('../../src/database/connection')

const email = 'email@email.com'




describe('Recording Session', () => {
  it('should login and create a new recording session', () => {
    // wait 1 second until authorization tests finilize
    setTimeout(async () => {
      const responseLogin = await request
        .post('/api/v1/login')
        .send({
          email: email,
          password: '123456'
        })

      const responseSession = await request
        .get('/api/v1/recording/new')
        .set('Authorization', 'Bearer ' + responseLogin.body.token)

      expect(responseSession.body.email).toBe(email)
    }, 1000)
  })

  it('should login and get a active recording session', () => {
    // wait 1 second until authorization tests finilize
    setTimeout(async () => {
      const responseLogin = await request
        .post('/api/v1/login')
        .send({
          email: email,
          password: '123456'
        })

      const responseSession = await request
        .get('/api/v1/recording/new')
        .set('Authorization', 'Bearer ' + responseLogin.body.token)

      expect(responseSession.body.email).toBe(email)
    }, 1000)
  })
})
