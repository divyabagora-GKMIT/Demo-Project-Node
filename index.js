const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const { connectRedis, client } = require("./config/redis");
const userRoute = require("./routes/user.route");
const addressRoute = require("./routes/address.route");
dotenv.config();
const app = express();
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const timestamp = await sequelize.query("SELECT now() as current_time");
    let ping = await client.ping();
    res.send({
      message: "DB connected successfully",
      database: timestamp[0],
      redis: ping,
    });
  } catch (error) {
    console.log("Database connection failed", error);
    res.send({
      message: error.message,
    });
  }
});

app.use("/api/users", userRoute);
app.use("/api/addresses", addressRoute);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await connectRedis();
    console.log("Database connection successfull");

    app.listen(PORT);
    console.log(`Server running at port ${PORT}`);
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

startServer();
