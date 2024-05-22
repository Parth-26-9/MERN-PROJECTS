const zod = require("zod");

const createUser = zod.object({
  email: zod.string(),
  password: zod.string().min(8),
});

module.exports = {
  createUser: createUser,
};
