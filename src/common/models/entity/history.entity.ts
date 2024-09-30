import { CustomEntity } from '@common/decorators/custom-entity.decorator';
import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@CustomEntity(ActivateHistory.name)
export class ActivateHistory extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar' })
  sendData: string;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'varchar' })
  description: string;

  @Index()
  @ManyToOne(() => User, (user) => user.history)
  @JoinColumn({
    name: 'user',
  })
  user: User | number;
}
