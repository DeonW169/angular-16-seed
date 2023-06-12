FROM node:14.15.1-alpine3.12 AS node

ARG ENVIRONMENT="development"
ENV ENVIRONMENT=${ENVIRONMENT}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration $ENVIRONMENT

# Build runtime image
FROM nginx:1.13.7-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/kwikspace /usr/share/nginx/html