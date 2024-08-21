import _ from 'lodash';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COLLECTION_NAME } from '@common/constants/enum';
import { Property } from '@common/decorators/property.decorator';
import { UserRoles } from '@common/constants';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: COLLECTION_NAME.USER,
})
export class User extends Document {
  @Property({ type: String.name })
  @Prop({ type: String })
  id: string;

  @Property({ type: String.name })
  @Prop({ type: String, required: true })
  full_name: string;

  @Property({ type: String.name })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Property({ type: String.name })
  @Prop({ type: String })
  phone: string;

  @Property({ type: String.name, ref: COLLECTION_NAME.ROLE })
  @Prop({ enum: UserRoles, type: Object })
  roles: UserRoles;

  @Property({ type: String.name })
  @Prop({ type: String })
  password: string;

  @Property({ type: Boolean.name })
  @Prop({ type: Boolean })
  activated: boolean;

  @Property({ type: Number.name })
  @Prop({ default: 1 })
  is_active: number;

  // @Property({ type: String.name })
  // @Prop({ type: String })
  // refresh_token: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
