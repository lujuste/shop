import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import NextLink from 'next/link'
import React from 'react'

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

interface ProductProps {
  product: IProductItem
  addToCardHandler: (product: IProductItem) => Promise<void>
}

export default function ProductItem({
  product,
  addToCardHandler,
}: ProductProps) {
  return (
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
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography> ${product.price} </Typography>
        <Button
          onClick={() => addToCardHandler(product)}
          size="small"
          color="primary"
        >
          {' '}
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}
