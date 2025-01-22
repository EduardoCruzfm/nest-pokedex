import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    PokemonModule,//ya importa el modelo para ser consumido ->exports:[MongooseModule]
    CommonModule
  ]
})
export class SeedModule {}
