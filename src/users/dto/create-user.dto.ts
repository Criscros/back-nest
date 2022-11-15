import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ 
    example: 'hola@rocketfy',
  })
  readonly email: string; 
}