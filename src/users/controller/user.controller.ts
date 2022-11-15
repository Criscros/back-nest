import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('/api/users')
export class UserController {
    constructor(private readonly booksService: UserService) {}
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.booksService.create(createUserDto);
    }
  

}
