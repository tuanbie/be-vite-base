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

export class UpdateUser {
  @ApiProperty({
    example: 'tun tun',
  })
  @MaxLength(125)
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: 'tuansk1002@gmail.com',
  })
  @MaxLength(125)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: '0987654321',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  phone: string;

  // @ApiProperty({
  //   type: [UserRoles],
  // })
  @IsOptional()
  @IsNotEmpty()
  // @Transform(({ value }) => transferValueRelations(value))
  roles: UserRoles[];

  @ApiProperty({
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  password: string;
}
