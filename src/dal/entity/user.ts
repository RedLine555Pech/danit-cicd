import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinTable,
} from "typeorm";
import { PostEntity } from "./post";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => PostEntity, (post) => post.author)
  @JoinTable()
  posts: PostEntity[];
}

export { User as UserEntity };
