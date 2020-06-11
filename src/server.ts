import * as express from "express";
import { connect } from "./database";
import { UserModel } from "./database/user/user.model";
import * as bodyParser from "body-parser";
import mealRouter from "./routes/meal.routes";
connect();
const app: express.Application = express();
app.use(bodyParser.json());
app.use("/meals", mealRouter);
app.get("/", (req, res) => {
  res.send("Hello World ss");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

app.get("/users", async (req, res) => {
  const users = await UserModel.find({});
  res.send({ users: users });
});
