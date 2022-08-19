import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [

    ConfigModule.forRoot({                                            // Modulo para la configuración de la aplicación               
      load: [ EnvConfiguration ],                                     // Variables de entorno
      validationSchema: JoiValidationSchema,                          // Validación de los datos de las variables de entorno usando joi
    }),  

    ServeStaticModule.forRoot({                                       // Servidor de archivos estaticos
      rootPath: join(__dirname,'..', 'public'),
    }),

    MongooseModule.forRoot( process.env.MONGODB ),                    // Conexion a la base de datos

    PokemonModule, CommonModule, SeedModule,                                                    // Modulo de pokemon
  ],
  
})
export class AppModule {}
