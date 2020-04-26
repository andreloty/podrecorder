import React, { useContext } from 'react'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'

export default function MainApp() {
  const history = useHistory()
  const { logout } = useContext(AuthContext)

  const logOut = (e) => {
    e.preventDefault()
    logout()
    history.push('/')
  }

  return (
    <div>
      <Link href="#" onClick={logOut} variant="body2">
        Sair
      </Link>
    </div>
  )
}
