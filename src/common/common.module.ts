import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [ AxiosAdapter ], // Importamos el adapter de Axios
    exports: [ AxiosAdapter ]   // Exportamos el adapter de Axios
})
export class CommonModule {}
