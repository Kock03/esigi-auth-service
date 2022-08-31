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
import { IProfile } from './_model/profile.model';
import { ICollaborator } from './_model/collaborator.model';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  collaboratorId: string;

  @Column()
  login: string;

  @Column()
  office: string;

  @Column()
  inactive: boolean;

  @Column({ nullable: true })
  profileId: string;

  
  @Column({ nullable: true })
  profileName: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  hasPassword() {
    this.password = hashSync(this.password, 10);
  }



  profile: IProfile;

  collaborator: ICollaborator;


}
