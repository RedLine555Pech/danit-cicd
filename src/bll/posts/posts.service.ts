import PostsRepository from "../../dal/posts/posts.repository";
import { Post, PagedPosts } from "../../types/posts.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  getAllPosts = (): Promise<Post[]> => {
    return this.postsRepository.getAllPosts();
  };

  createAPost = (post: Post) => {
    return this.postsRepository.createAPost(post);
  };

  transactionExample = () => {
    return this.postsRepository.transactionExample();
  };
}

export default PostsService;
