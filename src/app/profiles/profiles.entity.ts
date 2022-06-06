import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../roles/role.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'profiles' })
export class ProfilesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: String;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  @ManyToMany(() => UsersEntity, (user) => user.profile, {
    cascade: ['insert'],
  })
  user: UsersEntity[];

  
  @OneToOne(() => RoleEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn()
  role: RoleEntity;
}
