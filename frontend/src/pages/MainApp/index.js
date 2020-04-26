import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'
import Copyright from '../Shared/copyright'
import Logout from '../Shared/logout'

export default function MainApp() {
  const history = useHistory()
  const { user } = useContext(AuthContext)

  const newRecording = () => {
    history.push('/new')
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography component="h1" variant="h5">
        Olá {user.firstName} {user.lastName}
      </Typography>
      <Link href="#" onClick={newRecording} variant="body2">
        Fazer uma nova gravação
      </Link>
      <Logout />
      <Copyright />
    </Grid>
  )
}
