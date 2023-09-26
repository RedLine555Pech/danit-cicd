import { UserEntity } from "../entity/user";
import { PostEntity } from "../entity/post";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs";
import { EntityTarget, ObjectLiteral } from "typeorm";

export abstract class Factory<T> {
  entity: EntityTarget<ObjectLiteral>;
  abstract create(): Promise<T>;
}

export class UserFactory extends Factory<UserEntity> {
  constructor() {
    super();
    super.entity = UserEntity;
  }
  create = async (): Promise<UserEntity> => {
    const user = new UserEntity();
    user.email = faker.internet.email();
    const password = faker.random.word();
    const encryptedPassword = await bcrypt.hash(password, 10);
    user.password = encryptedPassword;
    return user;
  };
}

export class PostFactory extends Factory<PostEntity> {
  constructor() {
    super();
    super.entity = PostEntity;
  }
  create = async (): Promise<PostEntity> => {
    const post = new PostEntity();
    //-----------
    return post;
  };
}
