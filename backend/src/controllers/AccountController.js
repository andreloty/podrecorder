/* eslint-disable class-methods-use-this */
import UserService from '../services/UserService'

class AccountController {
  async signup(req, res) {
    const { firstName, lastName, email, password } = req.body
    const id = await UserService.signup(firstName, lastName, email, password)
    const token = UserService.generateToken(id, firstName, lastName)
    return res.status(201).json({ id, token })
  }

  async login(req, res) {
    const { email, password } = req.body
    const user = await UserService.login(email, password)

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' })
    }

    const token = UserService.generateToken(
      user.id,
      user.firstName,
      user.lastName
    )
    return res.status(201).json({ id: user.id, token })
  }
}

export default new AccountController()
