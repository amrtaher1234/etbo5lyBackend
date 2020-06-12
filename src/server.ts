import * as express from "express";
import { connect } from "./database";
import baseRouter from "./routes/index";
import * as jwt from "jsonwebtoken";
import { UserModel } from "./database/user/user.model";
require("dotenv").config();
connect();
const app: express.Application = express();
app.use(express.json());
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const token = req.headers["x-access-token"];
    const { userId, exp } = jwt.verify(
      token as string,
      process.env.JWT_SECRET
    ) as any;
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    const loggedUser = await UserModel.findById(userId);
    res.locals.loggedInUser = loggedUser;
    next();
  } else {
    next();
  }
});
app.use("/", baseRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
