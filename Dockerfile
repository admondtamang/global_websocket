FROM node:18-alpine as base

FROM base as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build app
RUN yarn build

FROM base as prod

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules 

COPY package.json yarn.lock ./
RUN yarn install --production
RUN yarn prisma:generate
COPY --from=builder /app/dist ./
COPY --from=builder /app/prisma ./prisma

RUN addgroup -g 1001 -S nodejs
RUN adduser -S axp -u 1001
RUN mkdir -p /usr/src/app/uploads
RUN chown -R axp:nodejs /usr/src/app
USER axp

# Expose port
EXPOSE 8080

# Start app
CMD [ "node", "/usr/src/app/index.js" ]
