import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../services/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: 200,
    },
  },
  paper: {
    marginTop: theme.spacing(0),
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
  const { login } = useContext(AuthContext)

  const [user, setUser] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const [formValid, setFormValid] = useState(true)

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

  async function handleLogin(e) {
    e.preventDefault()
    setFormValid(e.currentTarget.reportValidity())

    try {
      if (!e.currentTarget.reportValidity()) {
        setModalMsg('Todos os campos devem ser preenchidos!')
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 5000)
      } else {
        await login(user.email, user.password, user.remember)

        history.push('/app')
      }
    } catch (error) {
      if (error.message) {
        setModalMsg(error.message)
      } else {
        setModalMsg(error)
      }
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    }
  }

  return (
    <Box>
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
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onChange={onChange}
            value={user.email}
            error={!formValid}
            helperText="Todos os campos são obrigatórios!"
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
            autoComplete="off"
            onChange={onChange}
            value={user.password}
            error={!formValid}
            helperText="Todos os campos são obrigatórios!"
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
    </Box>
  )
}
