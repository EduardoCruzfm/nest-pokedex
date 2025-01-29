# Etapa 1: Instalar dependencias
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# Instalar dependencias necesarias para Node.js en Alpine
RUN apk add --no-cache libc6-compat

# Definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias con npm
RUN npm install 



# Etapa 2: Construir la aplicación
FROM node:18-alpine3.15 AS builder
WORKDIR /app

# Copiar los node_modules de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build



# Etapa 3: Imagen de producción
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app

# Copiar solo los archivos esenciales
COPY package.json package-lock.json ./

# Instalar solo dependencias de producción
RUN npm install --prod

# Copiar la aplicación compilada
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