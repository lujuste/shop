import type { NextPage } from 'next'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'

import NextLink from 'next/link'

import Layout from '../components/Layout'
import db from '../utils/db'
import Product from '../models/Product'

interface IProductItem {
  _id: string
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
  products: IProductItem[]
  children?: JSX.Element[]
}

const Home = ({ products }: IProductsProps) => {
  return (
    <Layout>
      <div>
        <h1>Products</h1>

        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography> ${product.price} </Typography>
                  <Button size="small" color="primary">
                    {' '}
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocObj),
    },
  }
}
