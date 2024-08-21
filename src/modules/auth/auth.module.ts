import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@modules/user/user.service';
// import { ModelsModule } from '@common/models/models.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appSettings } from '@common/configs/appSetting';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ModelsModule } from '@common/models/models.module';

@Module({
  imports: [
    ModelsModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: appSettings.jwt.secret,
      signOptions: { expiresIn: appSettings.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
