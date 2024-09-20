import { User } from '@common/models/entity/user.entity';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { hashing } from '@common/utils/hashing.util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/input.dto';
import { MESSAGES, UserRoles } from '@common/constants';
import { UpdateUser } from './dto/update.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUser(email: string) {
    const user = await this.userModel.findOne({ email });

    // .select('-password');

    if (!user) return null;
    return user.toObject();
  }

  async getUserById(_id: string) {
    const user = await this.userModel.findOne({ _id });
    return user as any;
  }

  async create(payload: CreateUserDto) {
    const { password, email } = payload;
    const hashPass = await hashing(password);
    const checkUser = await this.userModel.findOne({ email });
    if (checkUser) {
      throw new BadRequestException(MESSAGES.EMAIL_EXISTS);
    }
    const newUser = await this.userModel.create({
      ...payload,
      password: hashPass,
      roles: UserRoles.MEMBER,
    });
    await newUser.save();
    return newUser;
  }

  async update(_id: string, updateUsersDto: UpdateUser): Promise<any> {
    const { email, password } = updateUsersDto;
    const collection = await this.userModel.findOne({ _id });

    if (collection.email !== email) {
      await this.checkEmailValid(email);
    }

    if (password) {
      updateUsersDto.password = await hashing(password);
    }

    if (!password) {
      delete updateUsersDto.password;
    }

    await this.userModel.updateOne(
      {
        _id,
      },
      updateUsersDto,
    );

    return {
      data: await this.userModel.findById(collection?._id),
    };
  }

  private async checkEmailValid(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new UnprocessableEntityException(
        'email_already_exists',
        'Email already exists',
      );
    }
  }
}
