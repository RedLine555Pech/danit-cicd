import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { UserEntity } from "./user";
@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  @Index()
  category: string;

  @Column("simple-array")
  tags: string[];

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  @JoinTable()
  author: UserEntity;
}
export { Post as PostEntity };
