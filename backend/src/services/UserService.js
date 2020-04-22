const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../database/connection')

module.exports = {
  async encrypt(value) {
    const encryptedHash = await bcrypt.hash(value.toString(), 10)
    return encryptedHash
  },

  async signup(firstName, lastName, email, pwd) {
    const password = await this.encrypt(pwd)
    // eslint-disable-next-line array-bracket-spacing
    const [id] = await knex('user').returning('id').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    })

    return id
  },

  async login(email, pwd) {
    const user = await knex('user').where('email', email).select('*').first()

    if (!user || !this.compareHash(pwd.toString(), user.password)) {
      return null
    }

    return user
  },

  async compareHash(pwd, hash) {
    const isEqual = await bcrypt.compare(pwd, hash)
    return isEqual
  },

  generateToken(id, firstName, lastName) {
    const mySecret = process.env.MY_SECRET || 'mySecret'
    const token = jwt.sign({ id, firstName, lastName }, mySecret)
    return token
  }
}
