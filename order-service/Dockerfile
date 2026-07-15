FROM node:22-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/proto ./proto

RUN npx prisma generate

RUN addgroup -S ordergroup && adduser -S orderuser -G ordergroup
USER orderuser

EXPOSE 3001

CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]