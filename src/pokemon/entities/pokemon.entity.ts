import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // Nos agrega todas las funcionalidades de mongoose

@Schema()                               // Nos permite definir un esquema de mongoose en Nest
export class Pokemon extends Document{  // Las entities hacen referencia a como queremos que se vea la data en la base de datos

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no:number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);