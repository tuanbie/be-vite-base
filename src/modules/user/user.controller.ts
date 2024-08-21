import { Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomController } from '@common/decorators/custom-controller.decorator';
import { RestMethod } from '@common/decorators/rest-method.decorator';
import { CreateUserDto } from './dto/input.dto';
import { CacheMangerService } from '@common/configs/cache-manager/cache-manger.service';
import { COLLECTION_NAME } from '@common/constants/enum';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ICurrentUser } from '@common/types/current-user.type';
import { Authorize } from '@common/decorators/authorize.decorator';
import { UserRoles } from '@common/constants';
import { UpdateUser } from './dto/update.dto';

@CustomController('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cacheMangerService: CacheMangerService,
  ) {}

  @RestMethod({
    method: 'POST',
    path: 'create',
    summary: 'Create a new user (Role: admin)',
  })
  createStudent(
    @Body() payload: CreateUserDto,
    // @CurrentUser() user: ICurrentUser,
  ) {
    return this.userService.create(payload);
  }

  @Authorize(UserRoles.MEMBER)
  @RestMethod({
    method: 'GET',
    path: 'profile',
    summary: 'get profile user',
  })
  async getMe(@CurrentUser() req: any) {
    console.log(req);
    const cacheKey = await this.cacheMangerService.generateCacheKeyForFindAll(
      COLLECTION_NAME.USER,
      'me',
      null,
      req,
    );

    const data = await this.cacheMangerService.getCache(cacheKey);
    if (data) {
      return data;
    }

    const result = await this.userService.getUserById(req['_id'] as string);
    await this.cacheMangerService.setCollectionCacheKey(
      COLLECTION_NAME.USER,
      cacheKey,
    );

    await this.cacheMangerService.setCache(cacheKey, result);

    return result;
  }

  @Authorize(UserRoles.MEMBER)
  @RestMethod({
    method: 'PATCH',
    path: 'update_me',
    summary: 'get profile user',
  })
  async updateMe(@CurrentUser() req: any, @Body() data: UpdateUser) {
    const { _id } = req;
    console.log('cdscsd', req);
    const result = await this.userService.update(_id, data);
    const cacheKey = await this.cacheMangerService.generateCacheKeyForFindAll(
      COLLECTION_NAME.USER,
      'me',
      null,
      req,
    );
    const cacheKeys: any = await this.cacheMangerService.getCache(cacheKey);
    Promise.all([
      this.cacheMangerService.clearAllCachedKeys(
        cacheKeys,
        COLLECTION_NAME.USER,
      ),
      this.cacheMangerService.clearCachedKey(
        await this.cacheMangerService.generateCacheKeyForFindOne(
          COLLECTION_NAME.USER,
          _id,
          null,
        ),
      ),
    ]);

    return result;
  }
}
