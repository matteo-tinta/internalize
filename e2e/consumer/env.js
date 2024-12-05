import dotenv from "dotenv"
dotenv.config()

const {
  SERVER_PRIVATE_KEY,
  SERVER_PUBLIC_KEY,
  INTERNALIZE_PUBLIC_KEY
} = process.env

const normalize = (key) => key?.replaceAll("\\n", "\n")

const normalizedServerPrivateKey = normalize(SERVER_PRIVATE_KEY)
const normalizedServerPublicKey = normalize(SERVER_PUBLIC_KEY)
const normalizedInternalizePublicKey = normalize(INTERNALIZE_PUBLIC_KEY)

export {
  normalizedServerPrivateKey as SERVER_PRIVATE_KEY,
  normalizedServerPublicKey as SERVER_PUBLIC_KEY,
  normalizedInternalizePublicKey as INTERNALIZE_PUBLIC_KEY
}