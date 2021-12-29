import { useRouter } from 'next/router'
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
  price: Number
  brand: string
  rating: Number
  numReviews: Number
  countInStock: Number
  description: string
}

interface IProductsProps {
  products: IProductItem
  children?: JSX.Element[]
}

export default function ProductScreen({ products }: IProductsProps) {
  const classes = useStyles()
  const { state, dispatch }: any = useContext(Store)

  if (!products) {
    return <div>Product not found</div>
  }

  const addToCartHandler = async () => {
    //@ts-ignore

    const { data }: any = await axios.get(`/api/products/${products._id}`)
    if (data.countInStock <= 0) {
      window.alert('Produto indisponível')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...products, quantity: 1 } })
  }

  return (
    <Layout title={products.name}>
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
            src={products.image}
            alt={products.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {products.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {products.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {products.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {products.rating} stars ({products.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {products.description}</Typography>
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
                    <Typography>${products.price}</Typography>
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
                      {products.countInStock > 0 ? 'In stock' : 'Unavailable'}
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
  const products = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      products: db.convertDocObj(products),
    },
  }
}
