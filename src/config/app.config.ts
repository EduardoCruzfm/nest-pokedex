
//Mapemos nuestra variables de entorno a un objeto que muestra
//nuestra configuracion de nuestras variables de entorno
export const EnvConfiguration = () => ({
    environment : process.env.NODE_ENV || 'dev', //estamos en produc || modo desarrollo
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: process.env.DEFAULT_LIMIT || 7
})