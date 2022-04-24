FROM node:16 AS builder
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:16 AS runtime-env
COPY --from=builder --chown=node:node /build/dist /app
COPY ./package*.json .
COPY ./serviceAccountKey.json /app
ENV FIRE_BASE_CREDENTIALS /app/serviceAccountKey.json
RUN npm install --production
WORKDIR /app

USER node
EXPOSE 5000
CMD [ "node", "index.js" ]  