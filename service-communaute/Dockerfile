FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

RUN chown -R node:node /app
USER node 

COPY --chown=node:node --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]