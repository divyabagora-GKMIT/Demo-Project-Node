const { client } = require("../config/redis");

let TTL = process.env.REDIS_TTL || 5000;
const getCachedUsers = async (key) => {
  const data = await client.get(key);
  if (data) return JSON.parse(data);
  else return null;
};

const getCachedUser = async () => {
  const data = await client.get("user");
  if (data) return JSON.parse(data);
  else return null;
};

const setCachedUsers = async (key, data) => {
  await client.set(key, JSON.stringify(data), { EX: TTL });
};

const setCachedUser = async (data) => {
  await client.set("user", JSON.stringify(data), { EX: TTL });
};

const delCachedUsers = async() => {
  const keys = await client.keys("users*");
  if (keys > 0 ) await client.del(...keys);
};

module.exports = {
  getCachedUsers,
  getCachedUser,
  setCachedUser,
  setCachedUsers,
  delCachedUsers
};
