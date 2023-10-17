FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PROTOCOL="http"
ARG DOMAIN="localhost:3003"
ARG API_VERSION="externalapi"

ENV NEXT_PUBLIC_API_PROTOCOL=${PROTOCOL}
ENV NEXT_PUBLIC_API_DOMAIN=${DOMAIN}
ENV NEXT_PUBLIC_API_VERSION=${API_VERSION}

CMD ["echo", "${PROTOCOL} -- ${DOMAIN} -- ${API_VERSION}"]

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
