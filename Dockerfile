FROM dshaneg/nodejs:8-alpine

LABEL "MAINTAINER" "shane.gibbons@gmail.com"

WORKDIR /app

COPY package.json /app/
COPY dist/ /app/
COPY node_modules /app/node_modules/

ENTRYPOINT [ "node", "index.js" ]