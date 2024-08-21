import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ModelsModule } from '@common/models/models.module';
import { CacheMangerModule } from '@common/configs/cache-manager/cache-manger.module';

@Module({
  imports: [ModelsModule, CacheMangerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
