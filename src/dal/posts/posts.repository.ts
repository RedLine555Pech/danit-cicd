import { PagedPosts } from "../../types/posts.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { PostEntity } from "../entity/post";
import { Post } from "../../types/posts.interface";
import { AppDataSource } from "../../dataSource";

@Service()
class PostsRepository {
  manager;
  constructor() {
    this.manager = AppDataSource.manager;
  }

  getAllPosts = async (): Promise<Post[]> => {
    const queryBuilder = this.manager.createQueryBuilder("post", "p");
    const res = await queryBuilder
      .innerJoinAndSelect("p.author", "a")
      .getMany();
    console.log(res);
    return res;
  };

  createAPost = async (post: Post) => {
    console.log(post);
    const res = await this.manager.create(PostEntity, post);
    console.log(res);
    await this.manager.insert(PostEntity, res);
    return res;
  };

  transactionExample = async () => {
    return this.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.insert(PostEntity, {
        title: "transaction title1",
        content: "transaction content1",
        tags: ["tag1"],
      });
      await transactionalEntityManager.insert(PostEntity, {
        title: "transaction title2",
        content: "transaction content2",
        tags: ["tag2"],
      });
    });
  };
}

export default PostsRepository;
