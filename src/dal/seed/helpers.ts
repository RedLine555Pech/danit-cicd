import FactoryInstance from "./factory/index";

export function createMany<Entity>(transactionalEntityManager, count) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    FactoryInstance.getEntityFactory();
    //const entity = userFactory.createEntity();
    //promises.push(transactionalEntityManager.save(entity));
    //console.log(`Inserted into db: ${JSON.stringify(entity)}`);
    promises.push(Promise.resolve(true));
  }
  return Promise.all(promises);
}
