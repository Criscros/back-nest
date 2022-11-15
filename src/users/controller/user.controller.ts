import { Controller, Post, Body, Res} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('/api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('create-user')
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
}
