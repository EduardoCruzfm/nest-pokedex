<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
``` 
3. Tenes Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

<!-- 5. Clonar el archivo __.env.template__ y renombrar a __.env__  -->
5. Clonar el archivo ```.env.template``` y renombrar a ```.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicacion en dev:
```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```
## Stack usado
* MongoDB
* Nest

## MongoDB
```
 npm i @nestjs/mongoose mongoose
```

# Production Build 
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod.

* En Railway, dentro del servicio del proyecto [Backend] (subido desde GitHub), crea una nueva variable de entorno con el nombre ```MONGODB```.

* Asigna como valor la variable ```MONGO_URL```, que se encuentra en el servicio de MongoDB dentro de Railway.

Railway automáticamente genera una copia del proyecto y reemplaza la variable de .env con la URL interna de MongoDB, permitiendo la conexión segura entre servicios.

Ejemplo del formato esperado:
```
MONGODB = mongodb://mongo:YL*****IH@mongodb.railway.internal:27017
```

3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Levantar el contenedor en segundo plano  
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

# Nota
Por defecto, docker-compose usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build
```