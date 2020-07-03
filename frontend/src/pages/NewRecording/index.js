import React, { useContext, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import AuthContext from '../../services/auth'
import { getActiveSession } from '../../services/recording'
import Logout from '../Shared/logout'
import socket from '../../services/socket'
import { Grid, Box } from '@material-ui/core'
import dotenv from 'dotenv'
import { addToStorage } from '../../services/storage'

dotenv.config()

const connected = [
  <Typography component="h3" variant="h5" color="primary">
    <strong>Você está conectado.</strong>
  </Typography>,
]
const desconnected = [
  <Typography component="h3" variant="h5" color="error">
    <strong>Você está desconectado.</strong>
  </Typography>,
]

export default function NewRecording() {
  const { user } = useContext(AuthContext)
  const userFullName = `${user.firstName} ${user.lastName}`.trim()
  const [connectedText, setConnectedText] = useState(desconnected)
  const [showData, setShowData] = useState('hidden')
  const [users, setUsers] = useState([userFullName])
  const [room, setRoom] = useState({
    code: '',
    session: '',
    url: '',
  })

  useEffect(() => {
    const getSession = async () => {
      const resp = await getActiveSession()

      if (resp.error) {
        setRoom({
          code: '',
          url: '',
        })
        setShowData('hidden')
      } else {
        setRoom({
          code: resp.data.code,
          session: resp.data.session,
          url: `${process.env.REACT_APP_URL}/session/${resp.data.session}`,
        })
        setShowData('visible')

        if (resp.data.session) {
          addToStorage('sessionId', resp.data.session)
          addToStorage('code', resp.data.code)
          const username = `${user.firstName} ${user.lastName}`.trim()
          joinToSession(resp.data.session, username)
        }
      }
    }

    getSession()
  }, [user])

  useEffect(() => {
    socket.on('newGuestOn', (guest) => {
      if (guest) {
        const newUsers = [...users]
        if (!users.find((v) => v === guest)) {
          newUsers.push(guest)
        }
        setUsers(newUsers)
        setConnectedText(connected)
      }
    })
  }, [users])

  socket.on('userConnected', () => {
    const username = `${user.firstName} ${user.lastName}`.trim()
    joinToSession(room.session, username)
  })

  const joinToSession = (session, user) => {
    if (session && user) {
      socket.emit('joinToSession', session, user)
    }
  }

  socket.on('disconnect', (guest) => {
    setConnectedText(desconnected)
  })

  function ListItem(props) {
    return <li>{props.value}</li>
  }

  function UserList(props) {
    if (props.users && props.users.length > 0) {
      const listItems = props.users.map((userListName, index) => [<ListItem key={index} value={userListName} />])
      return <ol>{listItems}</ol>
    }

    return <br />
  }

  return (
    <Box visibility={showData}>
      <Grid container direction="column" justify="center" alignItems="center">
        {connectedText}
        <Typography component="h5" variant="body1">
          <p>Pessoas conectadas no momento: {users.length}</p>
          <p>Para convidar pessoas, basta compartilhar o link e o código abaixo:</p>
          <p>
            <strong>{room.url}</strong>
          </p>
          <p>
            Código: <strong>{room.code}</strong>
          </p>
          <p>Já estão na sala:</p>
          <UserList users={users} />
        </Typography>
        <Logout />
      </Grid>
    </Box>
  )
}
