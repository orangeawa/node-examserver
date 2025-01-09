import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务启动在： http://localhost:${PORT}`);
  console.log('接口前缀 /api');
  console.log('使用 Ctrl + C 停止服务');
});
