import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[                           // importación del schema de mongoose
     MongooseModule.forFeature([      // forFeature nos permite importar el schema de mongoose
    { 
      name: Pokemon.name,                   // name: nombre de la entidad
      schema: PokemonSchema                 // schema: esquema de mongoose
    }
  ])
],
})
export class PokemonModule {}
