const userService = require('../services/userService')

module.exports = {
  async signup(req, res) {
    const { firstName, lastName, email, password } = req.body

    try {
      const id = await userService.signup(firstName, lastName, email, password)

      const token = userService.generateToken(id, firstName, lastName)

      return res.status(201).json({ id, token })
    } catch (error) {
      if (error.message.indexOf('user_email_unique') > 0) {
        return res
          .status(400)
          .json({ msg: 'Este email já existe na nossa base de dados! ' })
      }

      return res.status(500).json({ msg: 'Erro desconhecido!' })
    }
  },

  async login(req, res) {
    const { email, password } = req.body

    try {
      const user = await userService.login(email, password)

      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password!' })
      }

      const token = userService.generateToken(
        user.id,
        user.firstName,
        user.lastName
      )
      return res.status(200).json({ id: user.id, token })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}