import { Controller, Post, Get, Body, Res, Param, UseGuards} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('create-user')
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }

    @Get('pokemon/:page')
    findAllByIds(@Param('page') page :number) {
      return this.userService.getPokemons(page);
    }
}
