import { Module  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import {PokemonService } from '../service/pokemon.service'

@Module({
    imports: [
            MongooseModule.forFeature([
                { name: User.name, schema: UserSchema },
            ]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        PokemonService
    ],

})
export class UsersModule {}
