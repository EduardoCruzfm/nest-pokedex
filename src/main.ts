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
      })
    );
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
