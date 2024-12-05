import * as env from "./env.js"
import NodeRSA from "node-rsa"
import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3004

app.use(bodyParser.json())

const encode = async (response) => {
  const key = new NodeRSA(
    env.INTERNALIZE_PUBLIC_KEY
  )

  return key.encrypt(JSON.stringify(response), "base64")
}

const decrypt = async (response) => {
  const key = new NodeRSA(
    env.SERVER_PRIVATE_KEY
  )

  const decrypted = key.decrypt(response, "utf-8")

  return JSON.parse(decrypted.toString())
}

app.get("/decode", async (req, res) => { 
  const decodedTokenAsExample = {
    userId: req.headers["userid"] //sent by cloning headers
  }

  if(!!req.headers["public_key"]) {
    //if public_key is not sent we don't want to use asymmetric encryption
    return res.send(await encode(decodedTokenAsExample))
  }

  return res.json(decodedTokenAsExample)
})

app.post("/decrypt", async (req, res) => {
  /** This endpoint is called by E2E tests in order to decode the given response */
  return res.json(await decrypt(req.body["response"]))
})

app.listen(port, () => {
  console.log(`CONSUMER listening on port ${port}`)
})