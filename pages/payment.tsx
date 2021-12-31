import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSnackbar } from 'notistack'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'
import CheckoutWizard from '../components/checkoutWizard'
import useStyles from '../utils/styles'
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch }: any = useContext(Store)
  const {
    cart: { shippingAddress },
  } = state
  const [paymentMethod, setPaymentMethod] = useState('')
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping')
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '')
    }
  }, [])

  const submitHandler = (e: any) => {
    closeSnackbar()
    e.preventDefault()
    if (!paymentMethod) {
      enqueueSnackbar('Payment required', { variant: 'error' })
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
      Cookies.set('paymentMethod', paymentMethod)
      router.push('/placeorder')
    }
  }

  return (
    <Layout title="Payment Method">
      {/* @ts-ignore */}
      <CheckoutWizard activeStep={2}> </CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal"
                ></FormControlLabel>
                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                ></FormControlLabel>
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              {' '}
              Continue{' '}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="primary"
              onClick={() => router.push('/shipping')}
            >
              {' '}
              Back{' '}
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
