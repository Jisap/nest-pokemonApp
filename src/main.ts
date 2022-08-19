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
      transform: true,                // Permite la transformación de los datos que vienen en los query params al formato que define los dtos
      transformOptions:{              // Opciones de transformación de los datos que vienen en los query params
        enableImplicitConversion: true  
      }
    })
  );

  await app.listen( process.env.PORT );             // Puerto de escucha
  console.log(`Server running on port ${ process.env.PORT }`);
}
bootstrap();                                        // Inicio del servidor
