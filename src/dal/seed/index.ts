import * as helpers from "./helpers";
import { UserEntity } from "../entity/user";

import { createConnection } from "typeorm";

createConnection().then(async (connection) => {
  await connection.manager.transaction(async (transactionalEntityManager) => {
    await helpers.createMany<UserEntity>(transactionalEntityManager, 20);
  });
});

// async function run() {
//   const connection = await createConnection();
//   await connection.manager.transaction(async (transactionalEntityManager) => {
//     await helpers.createMany(transactionalEntityManager, UserFactory, 20);
//   });
// }
// run();
