import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";


@Injectable()
export class AxiosAdapter implements HttpAdapter {  // Adapter que hace peticiones http de tipo get con Axios

    private axios: AxiosInstance = axios;           // Declaración de una instancia de axios para hacer peticiones a la API de Pokedex
    
    async get<T>( url: string ): Promise<T>{        // Usamos la interfaz HttpAdapter para definir el método get

        try {
            const { data } = await this.axios.get<T>( url ); // peticion get
            return data;                                     // Devolvemos el resultado de la petición   
        } catch (error) {
            throw new Error('This is an error - check logs');
        }
    }

    


}
