# NodeJS Express and React
In this section we will build a NodeJS Express server with a React FE which will integrate internalize in its main flow

### Server Setup
Let's setup our server:

```bash
cd ./server
nvm use latest
npm init -y
npm i express cors node-rsa --save
```

then create an `index.js` file in which you will type the following:
```js
import express from "express"
import cors from "cors"

const app = express()
const port = 3005

app.use(cors())

app.get("/me", (req, res) => {
  res.json({
    user: req.user
  })
})

app.get('/', (req, res) => {
  res.send('Hello Internalize!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

and change your `package.json` start script like so:
```bash
node index.js
```

> [!NOTE]
> It is recommended to use typescript also on your BE but in this example we will not cover how to install or configure typescript in your node installation

### Client setup
For this example we will use a vite project with typescript and react. The name of our project will be `internalize-fe`

```bash
npm create vite@latest

cd internalize-fe
npm install
npm run dev
```

open your `App.tsx` and replace it's content with a test call to your server installation, like so:

```typescript
import { useEffect, useState } from 'react'
import './App.css'

const fetchUserRolesFromBe = async () => {
  const data = await fetch("http://localhost:3000/me")
  return await data.json()
}

function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetchUserRolesFromBe().then(setData)
  }, [])

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default App
```

### Setup internalize
Follow the steps indicated [here](/quick-start/README.md)

## Internalize Flow
#### Create a BE endpoint which will decode your authorization method inside your server implementation:
In this example we will add a fake token decode just for the purpose of dimostrating the interrogation call

To do so change your BE `index.js`, adding the interrogation callback:
```js
import NodeRSA from "node-rsa"

const INTERNALIZE_PUBLIC_KEY=`your_internalize_public_key`

...
app.get("/decode", (req, res) => {
  const decodedTokenAsExample = {
    userId: req.headers["userid"] //sent by cloning headers (sent in middleware as example)
  }

  const key = new NodeRSA(
    INTERNALIZE_PUBLIC_KEY
  )

  const encrypted = key.encrypt(JSON.stringify(decodedTokenAsExample), "base64") //encrypt your data

  res.send(encrypted) //send as string
})
```

#### Create a BE Middleware in order to authorize some request through Internalize

```js
...
const INTERNALIZE_URL="http://localhost:3000/users/api"
const SERVER_PUBLIC_KEY=`your_server_public_key`
const SERVER_PRIVATE_KEY=`your_server_private_key`

const internalizeMiddleware = async (req, res, next) => {
  const internalizeReponse = await fetch(`${INTERNALIZE_URL}?interrogate=http://host.docker.internal:3005/decode`, {
    headers: {
      PUBLIC_KEY: SERVER_PUBLIC_KEY.replace(/\n/g, "\\n"),
      userId: "this_user_id"
    }
  })

  const response = await internalizeReponse.text()

  const key = new NodeRSA(
    SERVER_PRIVATE_KEY
  )

  const decrypted = key.decrypt(response, "utf-8")

  req.user = JSON.parse(decrypted.toString())
  next()
}
```

#### Add the just created middleware to your endpoints
```js
app.get("/me", internalizeMiddleware, (req, res) => { 
  //internalizeMiddleware is added here, 
  //req.user is populated by middleware
  res.json({
    user: req.user
  })
})
```

### Test your environment
Now add `this_user_id` inside internalize UI, link some roles and some actions to it

Start your FE and your BE and - if everything is installed fine - you will see this result on your page:

```json
{
  "user": {
    "userId": "this_user_id",
    "roles": [
      {
        "name": "App_Neptune_NAP_W",
        "actions": [
          "view_basic-info",
          "view_bulk-import",
          "view_product-hierarchy",
          "view_report"
        ]
      }
    ]
  }
}
```

### Conclusion
Now as said before it's up to you how to load, manage and cache this data in your application. 