# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite compile les VITE_* env vars au build — il faut les déclarer ici
ARG VITE_CALENDLY_URL=""
ENV VITE_CALENDLY_URL=$VITE_CALENDLY_URL

RUN npm run build

# Serve stage
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
