import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import dotenv from 'dotenv'
import { validateSession } from '../../services/recording'
import { addToStorage } from '../../services/storage'

dotenv.config()

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function initialState () {
  return { name: '', code: '' }
}

export default function Session () {
  const classes = useStyles()

  const [formValid, setFormValid] = useState(true)
  const [user, setUser] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const { id } = useParams();

  function onChange (e) {
    let { value, name } = e.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const history = useHistory()

  async function handleSession (e) {
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
        const response = await validateSession(id, user.code)

        if (response.data) {
          addToStorage('sessionId', id, true)
          addToStorage('name', user.name, true)
          addToStorage('code', user.code, true)
          history.push('/active-session')
        } else {
          setModalMsg('Sessão inválida!')
          setOpen(true)
          setTimeout(() => {
            setOpen(false)
          }, 5000)
        }
      }
    } catch (error) {
      setModalMsg(error)
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
        <form className={classes.form} onSubmit={handleSession} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onChange}
            value={user.name}
            error={!formValid}
            helperText="Todos os campos são obrigatórios!"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Código"
            name="code"
            autoComplete="code"
            onChange={onChange}
            value={user.code}
            error={!formValid}
            helperText="Todos os campos são obrigatórios!"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Participar da Gravação
          </Button>
        </form>
      </div>
    </Box>
  )
}
