import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule, // Al importar el módulo de Pokemon, se importan los métodos y servicios que contiene, incluido el módulo de mongoose
            CommonModule,  // Al importar el módulo de Common, se importan los métodos y servicios que contiene, incluido el httpAdapter 
  ], 
          
})
export class SeedModule {}
