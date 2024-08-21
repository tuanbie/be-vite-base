import { RelationRoot } from '@common/constants/enum';
import { UserRoles } from '@common/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  full_name?: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;
}
