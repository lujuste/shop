// @ts-nocheck

import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Link,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core'
import Head from 'next/head'
import React, { ReactElement, useContext, useState } from 'react'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'

import { useRouter } from 'next/router'

interface ILayout {
  children: ReactElement | ReactElement[]
  title?: string
  description?: string
}

function Layout({ children, title, description }: ILayout) {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Store)
  const { darkMode, cart, userInfo } = state
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })
  const classes = useStyles()

  const darkModeChangeHandler = () => {
    dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    })
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const loginClickHandler = e => {
    setAnchorEl(e.currentTarget)
  }

  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: 'USER_LOGOUT' })
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    router.push('/')
  }

  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Head>
        <title> {title ? `${title} - Just Shop` : 'Just Shop'} </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className={classes.navbar} position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Juste Shop</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart">
                <Link>
                  {cart?.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      {' '}
                      Cart{' '}
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {' '}
                    {userInfo.name}{' '}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login">
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer>
          <Typography className={classes.footer}>
            all rights reserved. Juste Shop
          </Typography>
        </footer>
      </ThemeProvider>
    </>
  )
}

export default Layout
