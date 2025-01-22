import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapter], //definimos nuestro provider para usarlo y exportarlo
    exports: [AxiosAdapter] // lo importamos para usarlo en otros modulos
})
export class CommonModule {}
