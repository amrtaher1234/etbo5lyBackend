import * as express from "express";
import { connect } from "./database";
import baseRouter from "./routes/index";

import * as cors from "cors";
const app: express.Application = express();
require("dotenv").config();
connect();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: true }));

app.use("/", baseRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
