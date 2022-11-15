
import { IsNotEmpty, Max, IsEmail} from 'class-validator'

export class CreateUserDto {

  @IsNotEmpty()
  name:string

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password:string
 
}