FROM node:22

SHELL [ "/bin/bash", "-c" ]
ENV NODE_OPTIONS=--use-openssl-ca
RUN npm set strict-ssl=false

WORKDIR /app
COPY ./package*.json .
RUN npm ci --verbose --force

# building the image
COPY ./ .
RUN npm run build

# running the image
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]