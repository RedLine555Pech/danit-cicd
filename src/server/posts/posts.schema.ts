const schema = {
  type: "object",
  properties: {
    author: { type: "string" },
    content: { type: "string" },
    title: { type: "string", maxLength: 25 },
    tags: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["author", "content", "title"],
  additionalProperties: false,
};

export default schema;
