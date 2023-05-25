interface Newsposts {
  id: number;
  title: string;
}

class FileDB {
  private schemas: Record<string, any>;
  private schemaFilePath = "./schema.json";
  constructor() {
    this.schemas = {};
  }
  registerSchema(name: string, schema: any): void {
    this.schemas = { ...this.schemas, [name]: schema };
  }

  getTable(name: string): Table {
    const schema = this.schemas[name];
    return new Table(this.schemaFilePath);
  }
}

export class Table {
  private schemaFilePath;
  private currentSchema;
  constructor(schemaFilePath) {
    this.schemaFilePath = schemaFilePath;
  }
  findAll(): Promise<Newsposts[]> {
    return Promise.resolve([]);
  }
  findById(): Promise<Newsposts> {
    return Promise.resolve({ id: 0, title: "" });
  }
  create(newData: Newsposts): Promise<Newsposts> {
    return Promise.resolve(newData);
  }
  update(id: number, updatedData: Newsposts): Promise<Newsposts> {
    return Promise.resolve(updatedData);
  }
  delete(id: number): Promise<number> {
    return Promise.resolve(id);
  }
}

export default new FileDB();
