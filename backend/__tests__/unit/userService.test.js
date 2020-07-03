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

  it('should return user data from token', () => {
    const user = {
      id: 444,
      firstName: 'Andre',
      lastName: 'Lima',
      email: 'teste@email.com'
    }

    const userTokenGenerate = userService.generateToken(
      user.id,
      user.firstName,
      user.lastName,
      user.email
    )

    const authorization = 'Bearer ' + userTokenGenerate

    const userInfoFromToken = userService.getUserInfo(authorization)

    expect(userInfoFromToken.id).toBe(user.id)
    expect(userInfoFromToken.firstName).toBe(user.firstName)
    expect(userInfoFromToken.lastName).toBe(user.lastName)
    expect(userInfoFromToken.email).toBe(user.email)
  });


  it('should create new user in database', async () => {
    const id = await userService.signup(
      'Andre',
      'Lima',
      'teste@email.com',
      123456
    )

    expect(id).toBeGreaterThan(0)
  })

  it('should return user from database', async () => {
    const user = await userService.login('teste@email.com', 123456)

    expect(user.id).toBeGreaterThan(0)
  })
})
