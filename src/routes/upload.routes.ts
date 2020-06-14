import * as express from "express";
import { upload } from "../upload";
const router = express.Router();
router.post("/", upload.single("file"), (req, res, next) => {
  console.log(req.file.path);
  res.send({ s: 1 });
});

export default router;
