import PostsService from "../../bll/posts/posts.service";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import postsSchema from "./posts.schema";
import { Service } from "typedi";
import * as express from "express";
import { Post } from "../../types/posts.interface";
import { AppError, ValidationError } from "../utils/customErrors";
import logger from "../utils/logger";
import auth from "../middlewares/auth.passport.middlewate";

@Service()
class PostsController {
  public path = "/posts";
  public router = express.Router();
  private postValidator;

  constructor(private postsService: PostsService) {
    this.initializeValidators();
    this.initializeRoutes();
  }

  public initializeValidators() {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    this.postValidator = ajv.compile(postsSchema);
  }

  public initializeRoutes() {
    this.router.get("/", this.getAllPosts);
    this.router.get("/trans", this.transactionExample);
    this.router.post("/", auth.required, this.createAPost);
  }

  transactionExample = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const res = await this.postsService.transactionExample();
      response.json(res);
    } catch (e) {
      next(e);
    }
  };

  getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.postsService.getAllPosts();
    response.json(posts);
  };

  createAPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const post: Post = request.body;
      const t = 10;
      t = 15;
      logger.info("BODY:" + request.body);
      logger.info("FIELDS:" + request["fields"]);
      const valid = this.postValidator(post);
      if (!valid) {
        throw new ValidationError({
          message: this.postValidator.errors.map((e) => e.message),
        });
      }
      try {
        const createdPost = await this.postsService.createAPost({
          ...post,
          author: { ...request["auth"], id: request["auth"].user_id },
        });
        response.send(createdPost);
      } catch (e) {
        throw new AppError({ message: e.message });
      }
    } catch (e) {
      next(e);
    }
  };
}

export default PostsController;
