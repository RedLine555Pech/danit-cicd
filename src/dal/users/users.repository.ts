import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { UserEntity } from "../entity/user";
import { AppDataSource } from "../../dataSource";

@Service()
class UsersRepository {
  manager;
  constructor() {
    this.manager = AppDataSource.manager;
  }

  getByEmail = async (email: string): Promise<User> => {
    const res = await this.manager.findOne(UserEntity, { where: { email } });
    return res;
  };

  createAUser = async (user: User): Promise<User> => {
    const res = await this.manager.create(UserEntity, user);
    await this.manager.insert(UserEntity, res);
    return res;
  };
}

export default UsersRepository;
