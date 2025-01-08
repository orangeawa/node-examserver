import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
服务启动在： http://localhost:${PORT}
接口前缀 /api
使用 Ctrl + C 停止服务
`);
});
