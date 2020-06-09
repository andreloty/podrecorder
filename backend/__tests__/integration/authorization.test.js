const request = require('supertest')
const app = require('../../src/app')

describe('Authorization (signup and login)', () => {
  it('should create a new user profile for authentication and receive a token', async () => {
    const response = await request(app).post('/api/v1/signup').send({
      firstName: 'Andre',
      lastName: 'Lima',
      email: 'email@email.com',
      password: '123456'
    })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeGreaterThan(0)
    expect(response.body.token).toBeDefined()
  })

  it('should receive a token when pass credentials for authentication', async () => {
    const response = await request(app).post('/api/v1/login').send({
      email: 'email@email.com',
      password: '123456'
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toBeGreaterThan(0)
    expect(response.body.token).toBeDefined()
  })
})
