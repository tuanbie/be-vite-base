import { Module } from '@nestjs/common';
import { CacheMangerService } from './cache-manger.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { appSettings } from '../appSetting';
const { redis } = appSettings;
const { host, port, password } = redis;
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host,
            port,
          },
          password,
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [CacheMangerService],
  exports: [CacheMangerService],
})
export class CacheMangerModule {}
