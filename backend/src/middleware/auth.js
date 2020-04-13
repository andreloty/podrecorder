import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido!' })
  }

  // eslint-disable-next-line array-bracket-spacing
  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify(token, process.env.MY_SECRET))

    req.userId = decoded.id
    req.userFirstName = decoded.firstName
    req.userLastName = decoded.lastName

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
