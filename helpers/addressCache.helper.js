const { client } = require("../config/redis");

let TTL = process.env.REDIS_TTL || 5000;
const getCachedAddresses = async (key) => {
  const data = await client.get(key);
  if (data) return JSON.parse(data);
  else return null;
};

const getCachedAddress = async () => {
  const data = await client.get("address");
  if (data) return JSON.parse(data);
  else return null;
};

const setCachedAddresses = async (key,data) => {
  await client.set(key, JSON.stringify(data), { EX: TTL });
};

const setCachedAddress = async (data) => {
  await client.set("address", JSON.stringify(data), { EX: TTL });
};

const delCachedAddresses = async() => {
  const keys = await client.keys("addresses*");
  if (keys > 0 ) await client.del(...keys);
};

module.exports = {
  getCachedAddresses,
  getCachedAddress,
  setCachedAddress,
  setCachedAddresses,
  delCachedAddresses
};
