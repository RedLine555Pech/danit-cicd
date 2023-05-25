import "reflect-metadata";
import PostsRepository from "./dal/posts/posts.repository";
import PostsService from "./bll/posts/posts.service";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import AuthController from "./server/auth/auth.controller";
import Container from "typedi";
import { createConnection } from "typeorm";

createConnection().then(() => {
  const app = new App(
    [Container.get(PostsController), Container.get(AuthController)],
    3000
  );

  app.listen();
});
