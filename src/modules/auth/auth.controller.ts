import { Body, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ICurrentUser } from '@common/types/current-user.type';
import { CustomController } from '@common/decorators/custom-controller.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@CustomController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      example: {
        email: 'example@gmail.com',
        password: 'string',
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: ICurrentUser) {
    console.log(user);
    return await this.authService.login(user);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getProfile(@CurrentUser() user: ICurrentUser) {
  //   return user;
  // }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body.refreshToken);
  }
}
