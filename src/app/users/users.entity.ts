import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { ProfilesEntity } from '../profiles/profiles.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: String;

  @Column({ name: 'last_name' })
  lastName: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  @BeforeInsert()
  hasPassword() {
    this.password = hashSync(this.password, 10);
  }

  @ManyToMany((type) => ProfilesEntity, (profile) => profile.user, { cascade: ['insert', 'soft-remove'], eager: true })
  @JoinTable({
    name: 'profile_user_profile',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'profile_id' }})
  profile: ProfilesEntity[];
}
