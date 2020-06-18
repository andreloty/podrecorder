import React, { useContext, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
//import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'
import { getActiveSession } from '../../services/recording'
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
    session: '',
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
          session: resp.data.session,
          url: `${process.env.REACT_APP_BASE_URL}/recording/${resp.data.session}`
        })
        setShowData('visible')

        joinToSession(room.session, user)
      }
    }

    getSession()

    socket.on('userConnected', () => {
      joinToSession(room.session, user)
    })
  }, [room.session, user])

  const joinToSession = (session, user) => {
    if (session && user) {
      socket.emit('joinToSession', session, user)
    }
  }

  socket.on('disconnect', (guest) => {
    setConnectedText(desconnected)
  })

  socket.on('newGuestOn', (guest) => {
    if (guest) {
      if (users.find((v) => v.firstName !== user.firstName && v.lastName !== user.lastName)) {
        users.push(guest)
      }
      setUsers(users)
      setConnectedText(connected)
    }
  })

  function ListItem (props) {
    return <li>{props.value.firstName} {props.value.lastName}</li>;
  }

  function UserList (props) {
    const users = props.users;
    if (users && users.length > 0) {
      const listItems = users.map((user, index) =>
        <ListItem key={index} value={user} />
      );
      return (
        <ol>
          {listItems}
        </ol>
      );
    }

    return <br />
  }

  return (
    <Box visibility={showData}>
      <Grid container direction="column" justify="center" alignItems="center">
        {connectedText}
        <Typography component="h5" variant="h5">
          <p>
            Pessoas conectadas no momento: {users.length} <br />
            Convidar pessoas:<br />
            Sala: {room.url}<br />
            Código: {room.code}</p>
          <UserList users={users} />
        </Typography>
        <Logout />
        <Copyright />
      </Grid>
    </Box>
  )
}
