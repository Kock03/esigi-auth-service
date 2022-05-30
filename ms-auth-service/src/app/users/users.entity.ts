import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: String;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: String;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: String;

  @BeforeInsert()
  hasPassword() {
    this.password = hashSync(this.password, 10);
  }
}
