# E2E Testing
Internalize support E2E Testing with some configuration ahead

1. create a `.env` file inside `e2e/consumer` folder with this content:
```env
SERVER_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nSERVER_KEY\n-----END PRIVATE KEY-----
SERVER_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nSERVER_KEY\n-----END PUBLIC KEY-----
INTERNALIZE_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nINTERNALIZE_KEY\n-----END PUBLIC KEY-----
```
> [!WARNING]
> INTERNALIZE_PUBLIC_KEY must be the same of the actual application

2. cd inside `e2e` and `e2e/consumer` folders and run `npm i`
3. launch Internalize `npm run docker` and `npm run dev`
4. cd inside `e2e` folder and run `npm start`

Playwright UI should popup and tests should be listed on the right