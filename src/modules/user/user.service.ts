import { User } from '@common/models/entity/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivateEnum, MESSAGES, UserRoles } from '@common/constants';
import { appSettings } from '@common/configs/appSetting';
import { hashing } from '@common/utils/hashing.util';
import { LoginGoogleDto } from '@modules/auth/dtos/login.dto';
import { CreateUserDto } from './dto/input.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['role'],
    });
  }

  async create(body: CreateUserDto): Promise<any> {
    const { username, password } = body;
    const newUser = this.userRepository.create(body);
    newUser.username = username;
    newUser.email = username;
    newUser.password = await hashing(password);
    newUser.is_activate = ActivateEnum.ACCEPT;
    newUser.role = 1;
    const getUser = await this.userRepository.findOne({
      where: { username: username },
    });
    if (getUser) {
      throw new ConflictException(MESSAGES.ACCOUNTEXIST);
    }
    const builder = await this.userRepository.save(newUser);
    return builder;
  }

  async filter(): Promise<any> {
    const newUser = await this.userRepository.find({
      where: {
        username: 'chungdi',
      },
      relations: ['role'],
    });
    console.log(newUser);
    return newUser;
  }

  async getUserByGoogleId(id: string) {
    const user = await this.userRepository.findOne({
      where: { google_id: id },
    });
    return user;
  }

  async createUser(data: LoginGoogleDto) {
    const { google_id } = data;
    const newUser = this.userRepository.create();
  }
}
