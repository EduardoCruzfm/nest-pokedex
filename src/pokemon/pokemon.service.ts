import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PokemonService {
  private defaulLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){ 

    this.defaulLimit = configService.get<number>('defaultLimit');
    // console.log(process.env.PORT);
    console.log(process.env.DEFAULT_LIMIT);
    // console.log(configService.getOrThrow('jwt-seed')); lanza un error si no existe
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handlerExeptions(error);
    }
  }

  findAll(paginationDto : PaginationDto) {
    const { limit = this.defaulLimit, offset = 0} = paginationDto;

    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset )
    .sort({
      no: 1 // que ordene no de manera asendente
    })
    .select('-__v') // quitarle ala respuesta la columna -__v
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if( !isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no : term})
    }

    // Mongo
    if (!pokemon && isValidObjectId( term )) {
      pokemon = await this.pokemonModel.findById( term );
    }
    
    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term .toLocaleLowerCase().trim()})
    }

    if (!pokemon) {
      throw new  NotFoundException(`Pokemon with id, name or no "${ term }" not found`)
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne (term );
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
     return {...pokemon.toJSON(),...updatePokemonDto};
      
    } catch (error) {
      this.handlerExeptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(id); 
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id : id }); 
    
    if (deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${id}" not found`)
    
    return;
  }

  private handlerExeptions(error:any){
    if (error.code === 11000) {
      throw new BadRequestException(
        `El campo '${Object.keys(error.keyValue)[0]}' con valor '${Object.values(error.keyValue)[0]}' ya existe.`,
      // `Pokemon exist in db ${ JSON.stringify(error.keyValue)}`
      );
    }
    console.log(error);
    
    throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);
  }

}
