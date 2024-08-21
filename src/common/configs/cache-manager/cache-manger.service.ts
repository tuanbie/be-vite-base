import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { appSettings } from '../appSetting';
// import { PagingDto } from 'src/common/dto/page-result.dto';

@Injectable()
export class CacheMangerService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async generateCacheKeyForFindAll(
    routerName: string,
    functionName: string,
    // queryParams: PagingDto,
    locale: string,
    options?: Object,
  ) {
    try {
      const key = `${
        appSettings.appName
      }:${routerName}:${functionName}-${locale}-
      ${encodeURIComponent(JSON.stringify(options))}`;
      //   ${encodeURIComponent(JSON.stringify(queryParams))}-
      return key.toString();
    } catch (error) {
      console.log('error', error);
    }
  }

  async generateCacheKeyForFindOne(
    routerName: string,
    id: string,
    locale: string,
  ) {
    try {
      const key = `${appSettings.appName}:${routerName}:${locale}:${id}`;
      return key;
    } catch (error) {
      console.log('error', error);
    }
  }

  async setCollectionCacheKey(routerName: string, cacheKey: string) {
    try {
      const cacheKeys = await this.cacheManager.get<any>(
        `${appSettings.appName}:${routerName}`,
      );

      if (cacheKeys) {
        cacheKeys.addedKeys.push(cacheKey);
        await this.cacheManager.set(
          `${appSettings.appName}:${routerName}`,
          cacheKeys,
        );
      } else {
        const newCacheKeys = new Set<string>();
        newCacheKeys.add(cacheKey);

        await this.cacheManager.set(`${appSettings.appName}:${routerName}`, {
          addedKeys: Array.from(newCacheKeys),
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async getCache(key: string) {
    try {
      const data = await this.cacheManager.get(key);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async setCache(key: string, data: any) {
    try {
      await this.cacheManager.set(key, data, 60000 * 60 * 24 * 1);
    } catch (error) {
      console.log('error', error);
    }
  }

  async clearAllCachedKeys(cacheKeys: Set<string>, collectionName: string) {
    try {
      if (!cacheKeys) return;
      const promises = Array.from(cacheKeys['addedKeys']).map(
        async (key: any) => {
          await this.cacheManager.del(key);
        },
      );

      await Promise.all(promises);

      await this.cacheManager.del(`${appSettings.appName}:${collectionName}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  async clearCachedKey(key: string) {
    try {
      if (!key) return;
      await this.cacheManager.del(key);
    } catch (error) {
      console.log('error', error);
    }
  }

  async clearAllCachedKey() {
    try {
      await this.cacheManager.reset();
    } catch (error) {
      console.log('error', error);
    }
  }
}
