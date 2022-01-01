import db from './db'
//@ts-ignore
const getError = err =>
  err?.response && err?.response?.data && err?.response?.data?.message
    ? err?.response?.data?.message
    : err?.message
//@ts-ignore
const onError = async (err, req, res, next) => {
  await db.disconnect()
  res.status(500).send({ message: err?.toString() })
}
export { getError, onError }
