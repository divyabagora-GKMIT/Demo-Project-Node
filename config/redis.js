const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.error("Redis Client Error:", err));
client.on("connect", () => console.log("Redis connected!"));
client.on("reconnecting", () => console.log("Redis reconnecting..."));
client.on("end", () => console.log("Redis connection closed"));

// Connect to Redis
async function connectRedis() {
  console.log(client.isOpen);
  if (!client.isOpen) {
    await client.connect();
  }
}

module.exports = {
  client,
  connectRedis,
};
