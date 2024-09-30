import { appSettings } from '@common/configs/appSetting';
import { TypeJWT } from '@common/constants/jwt.enum';
import { ICurrentUser } from '@common/types/current-user.type';
import { compareHash } from '@common/utils/hashing.util';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginGoogleDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email);

    if (user) {
      const isMatchPassword = await compareHash<String>(user.password, pass);

      if (!isMatchPassword) return null;
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async autoGenerateToken(payload: any) {
    const payloadAccess = { typeToken: TypeJWT.ACCESS_TOKEN, ...payload };
    const payloadRefresh = { typeToken: TypeJWT.REFRESH_TOKEN, ...payload };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payloadAccess, {
        secret: appSettings.jwt.secret,
      }),
      this.jwtService.signAsync(payloadRefresh, {
        expiresIn: appSettings.jwt.expiresInRefresh,
        secret: appSettings.jwt.secret,
      }),
    ]);

    return {
      accessToken: {
        token: accessToken,
        expiresIn: appSettings.jwt.expiresIn,
      },
      refreshToken: {
        token: refreshToken,
        expiresIn: appSettings.jwt.expiresInRefresh,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const verify: ICurrentUser = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: appSettings.jwt.secret,
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });

    if (verify.typeToken !== TypeJWT.REFRESH_TOKEN)
      throw new BadRequestException('Token expired or invalid');

    const user = await this.userService.findUser(verify.email);
    const { password, ...result } = user;

    const token = await this.autoGenerateToken({ email: result.email });

    return {
      token,
    };
  }

  async login(result: ICurrentUser) {
    const payload = {
      username: result.username,
    };

    const token = await this.autoGenerateToken(payload);

    return {
      user: result,
      token,
    };
  }

  async loginWithGoogle(body: LoginGoogleDto) {
    const { google_id } = body;
    const getUser = await this.userService.getUserByGoogleId(google_id);
    if (!getUser) {
      const createUser = await this.userService;
    }
    console.log(getUser);
    return getUser;
  }
}
