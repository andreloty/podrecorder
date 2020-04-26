import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import Copyright from '../Shared/copyright'

export default function Home() {
  const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <div>
      <Typography component="h1" variant="h5">
        Olá Mundo!
      </Typography>
      <Link href="#" onClick={login} variant="body2">
        Login
      </Link>
      <Copyright />
    </div>
  )
}
