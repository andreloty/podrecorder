import React, { useState, useEffect } from 'react'
import { Container, Box, Typography } from '@material-ui/core'
// import socket from '../../services/socket'
import MicRecorder from 'mic-recorder-to-mp3'
import dotenv from 'dotenv'

dotenv.config()

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export default function ActiveSession() {
  const [isBlocked, setIsBlocked] = useState(true)
  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    blobURL: '',
  })

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted')
        setIsBlocked(false)
      },
      () => {
        console.log('Permission Denied')
        setIsBlocked(true)
      }
    )
  }, [])

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
    <Container>
      <Box visibility={isBlocked ? 'visible' : 'hidden'}>
        <Typography>Por favor, libere o acesso ao microfone!</Typography>
      </Box>
      <Box visibility={isBlocked ? 'hidden' : 'visible'}>
        {/*
          <button onClick={start} disabled={recordingStatus.isRecording}>Record</button>
          <button onClick={stop} disabled={!recordingStatus.isRecording}>Stop</button>
        */}
        <audio visibility={recordingStatus.blobURL ? 'hidden' : 'visible'} src={recordingStatus.blobURL} controls="controls" />
      </Box>
    </Container>
  )
}
