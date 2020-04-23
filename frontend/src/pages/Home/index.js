import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
const SOCKET_IO_URL = 'http://localhost:3333'
const socket = io(SOCKET_IO_URL)

export default function Home() {
  const history = useHistory()
  const [connected, setConnected] = useState('desconectado')

  socket.on('connect', () => {
    setConnected('conectado')
  })

  const login = (e) => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <div>
      <Typography component="h1" variant="h5">
        Olá Mundo!
      </Typography>
      <Typography component="h3" variant="h5">
        Você está {connected}.
      </Typography>
      <Link href="#" onClick={login} variant="body2">
        Login
      </Link>
    </div>
  )
}
