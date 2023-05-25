import UsersRepository from "../../dal/users/users.repository";
import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUserByEmail = async (email: string): Promise<User> => {
    return this.usersRepository.getByEmail(email);
  };

  createAUser = async (user: User): Promise<User> => {
    return this.usersRepository.createAUser(user);
  };
}

export default UsersService;
