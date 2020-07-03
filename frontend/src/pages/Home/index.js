import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'

export default function Home () {
  const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography component="h1" variant="h5">
        Olá Mundo!
      </Typography>
      <Link href="#" onClick={login} variant="body2">
        Login
      </Link>
    </Grid>
  )
}
