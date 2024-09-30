import { AccountTypeEnum } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginGoogleDto {
  // @IsNotEmpty()
  // @ApiProperty()
  // @IsString()
  // name: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsString()
  // avatar: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsString()
  // phone: string;

  // @IsNotEmpty()
  // @ApiProperty()
  // @IsString()
  // email: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsString()
  // gender: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum;

  @IsOptional()
  @ApiProperty()
  @IsString()
  google_id: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  token_google: string;
}
