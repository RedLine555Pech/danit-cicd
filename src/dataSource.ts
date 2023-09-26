import { PostEntity } from "./dal/entity/post";
import { UserEntity } from "./dal/entity/user";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  url: "postgres://oxfbiixv:xYd-sxc8-IPWCLferUFiOLdCy2CQyP7M@snuffleupagus.db.elephantsql.com/oxfbiixv",
  entities: [PostEntity, UserEntity],
  synchronize: false,
  //migrations: ["src/dal/migrations/*.ts"],
});
