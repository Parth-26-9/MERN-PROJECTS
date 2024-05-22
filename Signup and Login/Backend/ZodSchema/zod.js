const zod = require("zod");

const createUser = zod.object({
  username: zod.string(),
  password: zod.string().min(8),
});

module.exports = {
  createUser: createUser,
};
