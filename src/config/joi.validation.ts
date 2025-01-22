import * as Joi from 'joi';

// Valida las variables de entorno y esten configuradas como yo
// las estoy esperando
// tiene mas prioridad que el app.config.ts

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6)
})
