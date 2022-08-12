import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [

    ServeStaticModule.forRoot({                                       // Servidor de archivos estaticos
      rootPath: join(__dirname,'..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), // Conexion a la base de datos

    PokemonModule, CommonModule,                                                    // Modulo de pokemon
  ],
  
})
export class AppModule {}
