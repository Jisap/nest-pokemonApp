import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import  axios,{ AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  //private readonly axios: AxiosInstance = axios; // Declaración de una instancia de axios para hacer peticiones a la API de Pokedex

  constructor(
    @InjectModel(Pokemon.name)                     // InjectModel nos permite injectar el modelo de mongoose 
    private readonly pokemonModel: Model<Pokemon>, // Inyección de dependencias: pokemonModel como modelo de mongoose basado en la entity pokemon
    private readonly http: AxiosAdapter,           // Inyección de dependencias: http como adapter de Axios
    ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany({});                                // Borramos todos los pokemones de la base de datos

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650') // Realizamos una petición a la API de Pokedex para obtener los primeros 650 pokemones

    //const insertPromisesArray = [];                                      // Declaramos un array de promesas para insertar los pokemones en la base de datos
    const pokemonToInsert: { name:string, no: number }[] = [];             // Declaramos un array de objetos para insertar los pokemones en la base de datos


    data.results.forEach(async ({ name, url } ) => {                       // Recorremos los resultados de la petición
      const segments = url.split('/');                                     // Separamos la url por / para obtener el id del pokemon
      const no:number = +segments[segments.length - 2];                    // Convertimos el id a numero
      //const pokemon = await this.pokemonModel.create({ no, name });      // Creamos el pokemon en la base de datos usando el modelo de mongoose
    
      //insertPromisesArray.push( this.pokemonModel.create({ no, name }) );// Añadimos la promesa de crear el pokemon a la lista de promesas   
    
      pokemonToInsert.push({ name, no });                                  // Añadimos el pokemon a la lista de pokemones a insertar
    });

    //await Promise.all( insertPromisesArray );                            // Ejecutamos todas las promesas de la lista de promesas

    this.pokemonModel.insertMany( pokemonToInsert );                       // Insertamos los pokemones en la base de datos

    return 'Seed executed successfully';
  }
  
}
