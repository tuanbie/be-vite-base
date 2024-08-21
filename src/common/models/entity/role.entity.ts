// import { CustomEntity } from '@common/decorators/custom-entity.decorator';
// import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user.entity';
// import { UserRoles } from '@common/constants';

// @CustomEntity(Role.name)
// export class Role {
//   @PrimaryGeneratedColumn('increment')
//   id: number;

//   @Column({ type: 'enum', enum: UserRoles })
//   name: UserRoles;

//   @OneToMany(() => User, (user) => user.role)
//   users: User[];
// }
