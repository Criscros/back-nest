import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { PokemonService } from '../../service/pokemon.service';
import { GenericData } from '../../model/generic-data';
import { map } from 'rxjs';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly pokemonService: PokemonService,

    ) {}

  async create(createUserDto: CreateUserDto){

    const { email } = createUserDto;
    let user =   this.userModel.findOne({ email });
    await user
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();

  }
  async getPokemons(index){    

    let offset =  parseInt(index+0)
    if(parseInt(index+0) > 1 ){
      offset =  parseInt(index+0) - 10
    }
    const apiPokemon = this.pokemonService.getPokemons(`pokemon/?offset=${offset}&limit=60`)
    const pokemonsInfo = await apiPokemon.then(async (pokemons)=>{
          // SET VARIABLES OBJECT...
          let data = new GenericData();
          data.info = pokemons
          
          let pokemonInfo = await Promise.all(
            data.info.results.map(async pokemon => {
              let filmResponse = await this.pokemonService.getPokemons(`pokemon/${pokemon.name}`)
              return filmResponse
            })
          )
          return pokemonInfo
    })

    return pokemonsInfo
  

  }

}
