import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../models/Product'
import db from '../../utils/db'
import data from '../../utils/data'
import User from '../../models/User'

const handler = nc()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  await db.connect
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({ message: 'seeded successfully' })
})

export default handler
