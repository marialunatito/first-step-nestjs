import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'profiles',
})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  avatar: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', default: null, nullable: true, name: 'deleted_at' })
  deletedAt: Date;
}
