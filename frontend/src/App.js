import React from 'react'
import Routes from './routes/routes'
import { AuthProvider } from './services/auth'

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
)

export default App
