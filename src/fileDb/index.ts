import FileDb from "./fileDb";

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

FileDb.registerSchema("newspost", newspostSchema);
const newspostTable = FileDb.getTable("newspost");
