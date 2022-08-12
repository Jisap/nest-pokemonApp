import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');      // Ruta ppal de la API

  app.useGlobalPipes(                 // Validaciones globales
    new ValidationPipe({
      whitelist: true,                // Solo muestra la data que estoy esperando en el dto
      forbidNonWhitelisted: true,     // Si viene un parametro que no esta en el whitelist, se lanza un error 
    })
  );

  await app.listen(3000);             // Puerto de escucha
}
bootstrap();                          // Inicio del servidor
