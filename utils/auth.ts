import jwt from 'jsonwebtoken'

const signToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    //@ts-ignore
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

export { signToken }
