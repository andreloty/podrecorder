import React, { useContext, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
//import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'
import { getActiveSession } from '../../services/recording';
import Copyright from '../Shared/copyright'
import Logout from '../Shared/logout'
import socket from '../../services/socket'
import { Grid, Box } from '@material-ui/core'
import dotenv from 'dotenv'

dotenv.config()

const connected = [<Typography component="h3" variant="h5" color="primary"><strong>Você está conectado.</strong></Typography>]
const desconnected = [<Typography component="h3" variant="h5" color="error"><strong>Você está desconectado.</strong></Typography>]

export default function NewRecording () {
  //const history = useHistory()
  const { user } = useContext(AuthContext)
  const [connectedText, setConnectedText] = useState(desconnected)
  const [showData, setShowData] = useState('hidden');
  const [users, setUsers] = useState([user]);
  const [room, setRoom] = useState({
    code: '',
    url: ''
  });

  useEffect(() => {
    const getSession = async () => {
      const resp = await getActiveSession()

      if (resp.error) {
        setRoom({
          code: '',
          url: ''
        })
        setShowData('hidden')
      } else {
        setRoom({
          code: resp.data.code,
          url: `${process.env.REACT_APP_BASE_URL}/${resp.data.session}`
        })
        setShowData('visible')
      }
    }

    getSession()

    socket.on('userConnected', () => {
      setConnectedText(connected)
    })

    socket.on('disconnect', (guest) => {
      setConnectedText(desconnected)
    })

    socket.on('newGuestOn', (guest) => {
      if (guest) {
        users.push(guest)
        setUsers(users)
      }
    })
  }, [users])

  return (
    <Box visibility={showData}>
      <Grid container direction="column" justify="center" alignItems="center">
        {connectedText}
        <Typography component="h5" variant="h5">
          <p>Pessoas conectadas no momento: 1</p>
          <p>Convidar pessoas:</p>
          <p>Sala: {room.url}</p>
          <p>Código: {room.code}</p>
          <ol>
            {users.map((u, i) => (
              <li key={i}>
                {u.firstName} {u.lastName}
              </li>
            ))}
          </ol>
        </Typography>
        <Logout />
        <Copyright />
      </Grid>
    </Box>
  )
}
