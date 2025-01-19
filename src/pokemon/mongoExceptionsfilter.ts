import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError, mongoose.Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError | mongoose.Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocurrió un error inesperado.';

    if (exception instanceof MongoServerError) {
      if (exception.code === 11000) {
        status = HttpStatus.BAD_REQUEST;
        const duplicatedField = Object.keys(exception.keyValue)[0];
        const duplicatedValue = Object.values(exception.keyValue)[0];
        message = `El campo '${duplicatedField}' con valor '${duplicatedValue}' ya existe.`;
      }
    } else if (exception instanceof mongoose.Error.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = Object.values(exception.errors)
        .map((error: any) => error.message)
        .join(', ');
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
