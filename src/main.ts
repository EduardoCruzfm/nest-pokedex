import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './pokemon/mongoExceptionsfilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2'); //nombre de ruta global

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //
      forbidNonWhitelisted: true,
      transform: true,// transforma la informa la info q fluye x los dtos
      transformOptions: { // mejora la validacion mas rapido ,pero usa mas memoria
        enableImplicitConversion: true
      }
      })
    );
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
  // const port = process.env.PORT || 3000;

  // console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
