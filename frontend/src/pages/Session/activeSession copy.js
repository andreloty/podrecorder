import React, { useState, useEffect } from 'react'
// import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
// import socket from '../../services/socket'
import MicRecorder from 'mic-recorder-to-mp3'
import dotenv from 'dotenv'

dotenv.config()

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export default function ActiveSession () {

  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    blobURL: '',
    isBlocked: false,
  });

  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted')
        recordingStatus.isBlocked = false
        setRecordingStatus(recordingStatus)
      },
      () => {
        console.log('Permission Denied')
        setRecordingStatus(recordingStatus)
      },
    )
  }, [recordingStatus])

  const start = () => {
    if (recordingStatus.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          recordingStatus.isRecording = true
          setRecordingStatus(recordingStatus)
        }).catch((e) => console.error(e));
    }
  }

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        recordingStatus.blobURL = URL.createObjectURL(blob)
        recordingStatus.isRecording = false

        setRecordingStatus(recordingStatus)
      }).catch((e) => console.log(e));
  };

  return (
    <Box>
      <button onClick={start} disabled={recordingStatus.isRecording}>Record</button>
      <button onClick={stop}>Stop</button>
      <audio src={recordingStatus.blobURL} controls="controls" />
    </Box>
  )
}
