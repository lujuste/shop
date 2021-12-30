import router, { useRouter } from 'next/router'
import React, { useContext } from 'react'
import axios from 'axios'
import NextLink from 'next/link'
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core'
import Layout from '../../components/Layout'

import useStyles from '../../utils/styles'
import Image from 'next/image'
import db from '../../utils/db'
import Product from '../../models/Product'
import { GetServerSideProps } from 'next'
import { Store } from '../../utils/Store'

interface IProductItem {
  _id?: string
  slug: string
  name: string
  category: string
  image: string
  price: number
  brand: string
  rating: number
  numReviews: number
  countInStock: number
  description: string
}

interface IProductsProps {
  product: IProductItem
  children?: JSX.Element[]
}

export default function ProductScreen({ product }: IProductsProps) {
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch }: any = useContext(Store)

  if (!product) {
    return <div>Product not found</div>
  }

  const addToCartHandler = async () => {
    //@ts-ignore
    const existItem = state.cart.cartItems.find(
      (x: any) => x._id === product._id
    )
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data }: any = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('Produto indisponível')
      return
    }

    if (data.countInStock < quantity) {
      window.alert('Produto indisponível')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={addToCartHandler}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context
  //@ts-ignore
  const { slug } = params
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      product: db.convertDocObj(product),
    },
  }
}
