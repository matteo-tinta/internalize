const {
  DB_CONN_STRING,
  NODE_ENV,
  RSA_PUBLIC_KEY,
  RSA_PRIVATE_KEY
} = process.env

const privateKey = RSA_PRIVATE_KEY?.replaceAll("\\n", "\n")
const publicKey = RSA_PUBLIC_KEY?.replaceAll("\\n", "\n")

export {
  DB_CONN_STRING,
  NODE_ENV,
  privateKey as RSA_PRIVATE_KEY,
  publicKey as RSA_PUBLIC_KEY
}