import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("服务启动成功，后端接口地址：http://localhost:3000/api");
});

// app.use("/api", router);

export default app;