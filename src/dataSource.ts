import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "expresstestdb",
  entities: ["src/dal/entity/*.ts"],
  synchronize: false,
  migrations: ["src/dal/migrations/*.ts"],
});
