import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[ 
    ConfigModule,                           // Importamos el modulo de configuracion de las variables de entorno
    MongooseModule.forFeature([             // Importación del schema de mongoose. forFeature nos permite importar el schema de mongoose
    { 
      name: Pokemon.name,                   // name: nombre de la entidad
      schema: PokemonSchema                 // schema: esquema de mongoose
    }
  ])
],
exports:[ 
  MongooseModule // Este modulo permite exportar el módulo de mongoose para que se pueda usar en otros módulos
]
})
export class PokemonModule {}
