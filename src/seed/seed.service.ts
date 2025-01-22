import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter // patron adaptador
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('http://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert : {name: string , no: number}[] = [];

    data.results.forEach(({ name , url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
    
      pokemonToInsert.push( {name,no} );
    });
    
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
  } 

}
