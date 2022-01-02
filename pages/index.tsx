import { useContext } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'

import Layout from '../components/Layout'
import db from '../utils/db'
import Product from '../models/Product'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import ProductItem from '../components/ProductItem'

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
  products: IProductItem[]
  children?: JSX.Element[]
}

const Home = ({ products }: IProductsProps) => {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Store)

  const addToCardHandler = async (product: IProductItem) => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock <= 0) {
      window.alert('Produto indisponível')
      return
    }

    const existItem = state.cart.cartItems.find(
      (x: any) => x._id === product._id
    )
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (data.countInStock < quantity) {
      window.alert('Produto indisponível')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }

  return (
    <Layout title="Home" description="">
      <div>
        <h1>Products</h1>

        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item md={4} key={product.name}>
              <ProductItem
                product={product}
                addToCardHandler={addToCardHandler}
              />
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
  const products = await Product.find({}, '-reviews').lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocObj),
    },
  }
}
