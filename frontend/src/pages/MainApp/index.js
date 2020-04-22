import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import { logout } from '../../auth'

export default function Home() {
  const history = useHistory()

  const logOut = (e) => {
    e.preventDefault()
    logout()
    history.push('/')
  }

  return (
    <div>
      <Typography component="h1" variant="h5">
        Main App
      </Typography>
      <Link href="#" onClick={logOut} variant="body2">
        Sair
      </Link>
    </div>
  )
}
