import React from 'react'
import ReactDOM from 'react-dom'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Header from './pages/Shared/header'
import Copyright from './pages/Shared/copyright'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Box>
      <Container component="main" maxWidth="sm">
        <Header />
        <App />
        <Copyright />
      </Container>
    </Box>
  </React.StrictMode>,
  document.getElementById('root')
)
