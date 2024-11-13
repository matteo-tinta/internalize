# Quick Start
1. Download internalize locally
2. run `docker build -t internalize .` to build the docker image of internalize
3. configure your Internalize with MongoDB instance with a `compose.yml` file like so:

```yml
version: '3.1'
name: test-implementation-internalize-flow

services:
  internalize:
    image: internalize
    restart: always
    ports:
    - 3000:3000
    environment:
      DB_CONN_STRING: mongodb://root:root@mongo:27017/internalize?authSource=admin
      RSA_PUBLIC_KEY: -----BEGIN PUBLIC KEY-----\nyour-public-key\n-----END PUBLIC KEY-----
      RSA_PRIVATE_KEY: -----BEGIN RSA PRIVATE KEY-----\nyour-private-key\n-----END RSA PRIVATE KEY-----
      NODE_TLS_REJECT_UNAUTHORIZED: 0

  mongo:
    image: mongo
    restart: always
    volumes:
      - data:/data
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 50000:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: root
      ME_CONFIG_MONGODB_URL: mongodb://root:root@mongo:27017/
      ME_CONFIG_BASICAUTH: false

volumes:
  data:
```