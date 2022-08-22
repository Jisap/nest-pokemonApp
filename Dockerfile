# Creamos una nueva imagen con las dependencias
# Install dependencies only when needed
# Nosotros queremos cargar las nuevas dependencias o cargar dependencias cuando no tengamos ninguna 
# Llamamos a este proceso "deps"
FROM node:18-alpine3.15 AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Creamos el directorio /app donde la imagen de node va a trabajar 
WORKDIR /app

# Copiamos a este directorio los package.json
#COPY package.json yarn.lock ./
COPY package.json package-lock.json ./

# npm ci instala dependencias directamente desde package-lock.json y usa el package.json sólo para validar que no hay versiones no coincidente -> error
#RUN yarn install --frozen-lockfile
RUN npm ci

# Esto crea una nueva imagen (builder)
# Construimos la app con las dependencias de la anterior imagen deps y copiamos al /app de docker todo el contenido de nuestra aplicación
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
#RUN yarn build
RUN npm run build

# Esto crea otra nueva imagen
# Esta es la que hace que arranque la aplicación
# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

#COPY package.json yarn.lock ./
COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]