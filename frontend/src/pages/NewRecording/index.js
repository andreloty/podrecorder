import React, { useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography'
//import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'
import Copyright from '../Shared/copyright'
import Logout from '../Shared/logout'
import socket from '../../services/socket'

export default function NewRecording() {
  //const history = useHistory()
  const { user } = useContext(AuthContext)
  const [connected, setConnected] = useState('desconectado')

  socket.on('connect', () => {
    setConnected('conectado')
  })

  return (
    <div>
      <Typography component="h1" variant="h5">
        Olá {user.firstName} {user.lastName}
      </Typography>
      <Typography component="h3" variant="h5">
        Você está {connected}.
      </Typography>
      <Logout />
      <Copyright />
    </div>
  )
}
