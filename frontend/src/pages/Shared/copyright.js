import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default function Copyright () {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        Podcast Recorder
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}
