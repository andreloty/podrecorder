import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
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
  return { email: '', password: '', remember: '' }
}

export default function Login() {
  const classes = useStyles()

  const [user, setUser] = useState(initialState)

  function onChange(e) {
    let { value, name } = e.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const history = useHistory()

  const signUp = (e) => {
    e.preventDefault()
    history.push('/signup')
  }

  // const forgoten = (e) => {
  //   e.preventDefault()
  //   history.push('/forgoten')
  // }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await api.post('/api/v1/login', { email: user.email, password: user.password })

      if (user.remember === 'remember') {
        localStorage.setItem('token', response.data.token)
      } else {
        sessionStorage.setItem('token', response.data.token)
      }

      history.push('/app')
    } catch (error) {}
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            value={user.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            value={user.password}
          />
          <FormControlLabel control={<Checkbox onChange={onChange} name="remember" value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            {/*<Grid item xs>
              <Link href="#" onClick={forgoten} variant="body2">
                {'Esqueceu a senha?'}
              </Link>
            </Grid>*/}
            <Grid item>
              <Link href="#" onClick={signUp} variant="body2">
                {'Ainda não tem conta? Registre-se!'}
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
