# Internalize!

Internalize is a lightweight Role Manager service that will manage all your actions and users in one place. Does not offer an Authentication Part which can be demanded to other services (ie: Azure)

The official doc can be found [here](https://matteo-tinta.github.io/internalize/#/)

## Configurations
You will need also to create a `.env` with these configurations:

```env
NODE_TLS_REJECT_UNAUTHORIZED=0
DB_CONN_STRING=mongodb://root:root@127.0.0.1:27017/internalize?authSource=admin
RSA_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nyour-public-key\n-----END PUBLIC KEY-----
RSA_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----\nyour-private-key\n-----END RSA PRIVATE KEY-----
```

## Getting Started
First, open docker and run:

```bash
npm run docker
# or
yarn docker
# or
pnpm docker
# or
bun docker
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Open [http://localhost:50000](http://localhost:50000) with your browser to see the mongo explorer.

## Dockerization

```bash
docker build . -t internalize
```