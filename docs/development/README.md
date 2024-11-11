# Development
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