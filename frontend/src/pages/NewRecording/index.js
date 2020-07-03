import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../services/auth'
import { getActiveSession } from '../../services/recording'
import Logout from '../Shared/logout'
import socket from '../../services/socket'
import { Button, Grid, Box, Typography } from '@material-ui/core'
import dotenv from 'dotenv'
import { addToStorage } from '../../services/storage'
import MicRecorder from 'mic-recorder-to-mp3'

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

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export default function NewRecording() {
  const { user } = useContext(AuthContext)
  const userFullName = `${user.firstName} ${user.lastName}`.trim()
  const [connectedText, setConnectedText] = useState(desconnected)
  const [showData, setShowData] = useState('hidden')
  const [users, setUsers] = useState([userFullName])
  const [isBlocked, setIsBlocked] = useState(false)
  const [textoBotao, setTextoBotao] = useState('Iniciar Gravação para Todos os Participantes.')
  const [room, setRoom] = useState({
    code: '',
    session: '',
    url: '',
  })
  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    blobURL: '',
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

  const getUserMedia = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted')
        setIsBlocked(false)
        setShowData('visible')
      },
      () => {
        console.log('Permission Denied')
        setIsBlocked(true)
        setShowData('visible')
      }
    )
  }

  useEffect(() => {
    getUserMedia()

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

  const joinToSession = (session, user) => {
    if (session && user) {
      socket.emit('joinToSession', session, user)
    }
  }

  socket.on('disconnect', (guest) => {
    setConnectedText(desconnected)
  })

  socket.on('userConnected', () => {
    const username = `${user.firstName} ${user.lastName}`.trim()
    joinToSession(room.session, username)
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

  const start = () => {
    if (recordingStatus.isBlocked) {
      console.log('Permission Denied')
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecordingStatus({
            ...recordingStatus,
            isRecording: true,
          })
        })
        .catch((e) => console.error(e))
    }
  }

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setRecordingStatus({
          ...recordingStatus,
          isRecording: false,
          blobURL: URL.createObjectURL(blob),
        })
      })
      .catch((e) => console.log(e))
  }

  const gerenciarGravacao = () => {
    if (!recordingStatus.isRecording) {
      socket.emit('iniciarGravacao', room.session)
      start()
      setTextoBotao('Gravando... Finalizar Gravação de Todos os Participantes.')
    } else {
      socket.emit('finalizarGravacao', room.session)
      stop()
      setTextoBotao('Iniciar Gravação para Todos os Participantes.')
    }
  }

  return (
    <Box visibility={showData}>
      <Grid container direction="column" justify="center" alignItems="center">
        {connectedText}
        <Box visibility={isBlocked ? 'visible' : 'hidden'}>
          <Typography>Por favor, libere o acesso ao microfone!</Typography>
          <Typography>Após a liberação, por favor atualize a página</Typography>
        </Box>
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
        <Box>
          <Button
            type="button"
            onClick={() => {
              gerenciarGravacao()
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            {textoBotao}
          </Button>
        </Box>
        <Box visibility={!recordingStatus.blobURL ? 'hidden' : 'visible'}>
          <audio src={recordingStatus.blobURL} controls="controls" />
        </Box>
        <Logout />
      </Grid>
    </Box>
  )
}
