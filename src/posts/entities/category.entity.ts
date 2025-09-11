import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 800, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 800, nullable: true, name: 'cover_image' })
  coverImage: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', default: null, nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
