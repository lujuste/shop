// @ts-nocheck

import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
} from '@material-ui/core'
import axios from 'axios'
import NextLink from 'next/link'
import router, { useRouter } from 'next/router'
import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'

export default function Register() {
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch }: any = useContext(Store)
  const { userInfo } = state
  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const classes = useStyles()

  const submitHandler = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('password nao batem ')
      return
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        email,
        name,
        password,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('userInfo', JSON.stringify(data))
      router.push(redirect || '/')
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message)
    }
  }

  return (
    <Layout title="Register">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Nome"
              inputProps={{ type: 'name' }}
              onChange={e => setName(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={e => setEmail(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={e => setPassword(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
              onChange={e => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              {' '}
              Login{' '}
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?&nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
