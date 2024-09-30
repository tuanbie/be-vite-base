import {
  Body,
  ClassSerializerInterceptor,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CustomController } from '@common/decorators/custom-controller.decorator';
import { CreateUserDto } from './dto/input.dto';
import { Authorize } from '@common/decorators/authorize.decorator';
import { UserRoles } from '@common/constants/role.enum';

@CustomController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('filter')
  @UseInterceptors(ClassSerializerInterceptor)
  public async filter(): Promise<any> {
    return await this.userService.filter();
  }

  @Post('create')
  // @UseInterceptors(ClassSerializerInterceptor)
  @Authorize(UserRoles.ADMIN)
  public async create(@Body() body: CreateUserDto): Promise<any> {
    return await this.userService.create(body);
  }
}
