import { ApiProperty } from '@nestjs/swagger';

export class GenericData {
  @ApiProperty()
  info: any;

  @ApiProperty()
  extraData: any;
}
