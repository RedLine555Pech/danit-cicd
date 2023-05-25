export interface IFactory<T> {
  createEntity(): T;
}

import { UserEntity } from "../../entity/user";
import { faker } from "@faker-js/faker";

class Factory {
  addToList(T: any) {
    console.log(T.constructor.name);
  }
  getEntityFactory() {}
}
const FactoryInstance = new Factory();

export function EntityFactory(target: any) {
  FactoryInstance.addToList(target);
}

@EntityFactory
class UserFactory {
  createEntity(): UserEntity {
    const user = new UserEntity();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
  }
}

export default FactoryInstance;
