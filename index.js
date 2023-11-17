require("dotenv").config();
const express = require("express");
const displayRoute = require("express-routemap");
const app = express();
const cors = require("cors");
const { welcomeMessage, appErrorMessage } = require("./src/constant/messages");
const { redisClient } = require("./config/redis");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: welcomeMessage,
  });
});
app.use("/api/v1/users", require("./src/route/user"));
app.use("/api/v1/payments", require("./src/route/payment"));
app.use("/api/v1/wallet", require("./src/route/wallet"));
app.listen(process.env.APP_PORT, () => {
  displayRoute(app);

  // databaseConnection();
  redisClient.connect();
  console.log(`listening on port http://localhost:${process.env.APP_PORT}`);
});

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: appErrorMessage,
  });
});
