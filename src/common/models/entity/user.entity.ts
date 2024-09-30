import { CustomEntity } from '@common/decorators/custom-entity.decorator';
import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import { ActivateEnum, DriverTypeEnum } from '@common/constants/global.enum';
import { ActivateHistory } from './history.entity';

@CustomEntity(User.name)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'int', nullable: true })
  phone: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', nullable: true })
  gender: boolean;

  @Column({ type: 'enum', enum: DriverTypeEnum, nullable: true })
  driver_tpe: DriverTypeEnum;

  @Column({ type: 'enum', enum: ActivateEnum })
  is_activate: ActivateEnum;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'date', nullable: true })
  delete_at: Date;

  @Column({ type: 'date', nullable: true })
  BOD: Date;

  @Column({ type: 'varchar', nullable: true })
  google_id: string;

  @Index()
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    name: 'role',
  })
  role: Role | number;

  @OneToMany(() => ActivateHistory, (history) => history.user)
  history: ActivateHistory[];
}
