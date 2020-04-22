import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function initialState() {
  return { firstName: '', lastName: '', email: '', password: '' }
}

export default function Login() {
  const classes = useStyles()

  const [user, setUser] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

  function onChange(e) {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    history.push('/login')
  }

  async function handleSignUp(e) {
    e.preventDefault()
    try {
      const response = await api.post('/api/v1/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })

      sessionStorage.setItem('token', response.token)

      history.push('/app')
    } catch (error) {
      if (error.response.data.msg) {
        setModalMsg(error.response.data.msg)
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 5000)
      } else {
        setModalMsg(error.message)
        setOpen(true)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {modalMsg}
        </Alert>
      </Collapse>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nome"
            name="firstName"
            autoComplete="text"
            autoFocus
            onChange={onChange}
            value={user.firstName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Sobrenome"
            name="lastName"
            autoComplete="text"
            onChange={onChange}
            value={user.lastName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={onChange}
            value={user.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            value={user.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Registrar!
          </Button>
          <Grid container>
            {/*<Grid item xs>
            <Link href="#" onClick={forgoten} variant="body2">
              {'Esqueceu a senha?'}
            </Link>
          </Grid>*/}
            <Grid item>
              <Link href="#" onClick={login} variant="body2">
                {'Voltar para o Login'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
