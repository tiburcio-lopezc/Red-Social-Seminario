# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /src/app
COPY . /src/app
RUN npm install

RUN apk --update add g++ make vips-dev=8.12.2-r5
RUN rm -rf node_modules/sharp/vendor

CMD ["node", "/src/app/index.js"]
EXPOSE 3000
