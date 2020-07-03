import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import socket from '../../services/socket'
import MicRecorder from 'mic-recorder-to-mp3'
import dotenv from 'dotenv'
import { getFromStorage } from '../../services/storage'

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

export default function ActiveSession() {
  const [connectedText, setConnectedText] = useState(desconnected)
  const [showData, setShowData] = useState('hidden')
  const [isBlocked, setIsBlocked] = useState(false)
  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    blobURL: '',
  })

  const session = {
    sessionId: getFromStorage('sessionId'),
    name: getFromStorage('name'),
    code: getFromStorage('code'),
  }

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

    joinToSession(session.sessionId, session.name)
  }, [session.name, session.sessionId])

  const joinToSession = (session, user) => {
    if (session && user) {
      socket.emit('joinToSession', session, user)
    }
  }

  socket.on('disconnect', (guest) => {
    setConnectedText(desconnected)
  })

  socket.on('newGuestOn', (guest) => {
    setConnectedText(connected)
  })

  socket.on('iniciarGravacao', () => {
    start()
  })

  socket.on('finalizarGravacao', () => {
    stop()
  })

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

  return (
    <Box visibility={showData}>
      <Grid container direction="column" justify="center" alignItems="center">
        {connectedText}
        <Box visibility={isBlocked ? 'visible' : 'hidden'}>
          <Typography>Por favor, libere o acesso ao microfone!</Typography>
          <Typography>Após a liberação, por favor atualize a página</Typography>
        </Box>
        <Box visibility={isBlocked ? 'hidden' : 'visible'}>
          {/*
          <button onClick={start} disabled={recordingStatus.isRecording}>Record</button>
          <button onClick={stop} disabled={!recordingStatus.isRecording}>Stop</button>
        */}
          <Box visibility={!recordingStatus.blobURL ? 'hidden' : 'visible'}>
            <audio src={recordingStatus.blobURL} controls="controls" />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
