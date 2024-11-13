
# Development
Internalize is a tool written in Typescript on NextJS

The minimal requirements to develop internalize are:
* Node: 22.9.0
* Docker (on windows you can use WSL)

This docs will also require docsify installed globally:

`npm i docsify -g`

## How to start internalize
There is a bug in internalize which react version does not match on material ui version, this because material ui version is stuck at 18 and next uses react canary 19.

So in order to install all the dependencies and run the application you'll need to use `--force` flag *

```bash
npm i --force
npm run docker

## on a new terminal
npm run dev
```

** this is needed until version 19 of react come out of canary development 

## Configurations
You will need also to create a `.env` with these configurations:

```env
NODE_TLS_REJECT_UNAUTHORIZED=0
DB_CONN_STRING=mongodb://root:root@127.0.0.1:27017/internalize?authSource=admin
RSA_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nyour-public-key\n-----END PUBLIC KEY-----
RSA_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----\nyour-private-key\n-----END RSA PRIVATE KEY-----
```


