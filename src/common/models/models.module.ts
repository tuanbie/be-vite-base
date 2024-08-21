import { appSettings } from '@common/configs/appSetting';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot(appSettings.mongoose.dbConn, {
      dbName: appSettings.mongoose.dbName,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class ModelsModule {}
