import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Link,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import useStyles from '../utils/styles'
import NextLink from 'next/link'

interface ILayout {
  children: ReactElement | ReactElement[]
  title?: string
  description?: string
}

function Layout({ children, title, description }: ILayout) {
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
      type: 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })
  const classes = useStyles()

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
              <NextLink href="/cart">
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login">
                <Link>Login</Link>
              </NextLink>
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
