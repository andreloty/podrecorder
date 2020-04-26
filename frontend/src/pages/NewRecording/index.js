import React, { useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography'
//import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'
import Copyright from '../Shared/copyright'
import Logout from '../Shared/logout'
import socket from '../../services/socket'
import { Grid } from '@material-ui/core'
import roomControl from '../../services/roomControl'
import dotenv from 'dotenv'

dotenv.config()

function createSession(id) {
  return `${process.env.REACT_APP_BASE_URL}/${id}/`
}

const room = { id: roomControl.newUID(), code: roomControl.newSessionCode() }
export default () => {
  //const history = useHistory()
  const { user } = useContext(AuthContext)
  const [connected, setConnected] = useState('desconectado')

  socket.on('connect', () => {
    console.log('conectei no socket')
    setConnected('conectado')
  })

  const urlSession = createSession(room.id, room.code)

  console.log(urlSession)

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography component="h3" variant="h5">
        Você está {connected}.
      </Typography>
      <Typography component="h5" variant="h5">
        <p>Pessoas conectadas no momento: 1</p>
        <p>Convidar pessoas:</p>
        <p>Sala: {urlSession}</p>
        <p>Código: {room.code}</p>
        <ol>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>maria</li>
          <li>jose</li>
        </ol>
      </Typography>
      <Logout />
      <Copyright />
    </Grid>
  )
}
