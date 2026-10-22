FROM node:22-alpine

ENV NODE_ENV=production \
    PORT=8081 \
    HOST=0.0.0.0

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund \
    && npm cache clean --force

COPY --chown=node:node . .

USER node
EXPOSE 8081

CMD ["npm", "run", "app"]
