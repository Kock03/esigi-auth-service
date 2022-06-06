import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProfilesEntity } from '../profiles/profiles.entity';

@Entity({ name: 'role' })
export class RoleEntity {
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

  
  @OneToOne(() => ProfilesEntity, profiles => profiles.role)
  profiles: ProfilesEntity;
}
