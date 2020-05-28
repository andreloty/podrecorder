/* eslint-disable no-undef */

const bcrypt = require('bcrypt')
const userService = require('../../src/services/UserService')

describe('User services', () => {
  it('should encrypt user password', async () => {
    const pwd = '123456'
    const encryptedHash = await userService.encrypt(pwd)
    const comparedHash = await bcrypt.compare(pwd, encryptedHash)
    expect(comparedHash).toBe(true)
  })

  it('should compare user encryped hash password', async () => {
    const pwd = '123456'
    const encryptedHash = await userService.encrypt(pwd)
    const isEqual = await userService.compareHash(pwd, encryptedHash)
    expect(isEqual).toBe(true)
  })

  it('should create new user in database', async () => {
    const id = await userService.signup(
      'Andre',
      'Lima',
      'andre@email.com',
      123456
    )

    expect(id).toBeGreaterThan(0)
  })

  it('should return user from database', async () => {
    const user = await userService.login('andre@email.com', 123456)

    expect(user.id).toBeGreaterThan(0)
  })
})
