import express, { Application } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("服务启动成功，后端接口地址：http://localhost:3000/api");
});

// app.use("/api", router);

export default app;