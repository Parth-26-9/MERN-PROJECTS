const zod = require("zod");
const zodSchema = zod.object({
  dataId: zod.number(),
  quote: zod.string(),
});

module.exports = {
  zodSchema: zodSchema,
};
