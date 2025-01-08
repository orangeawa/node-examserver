# 代码结构

```
nodejs-mysql-ts/
├── src/
│   ├── controllers/   # 控制器层
│   ├── models/        # 数据模型（或数据库表映射）
│   ├── routes/        # 路由
│   ├── services/      # 服务层（业务逻辑）
│   ├── config/        # 配置（MySQL 连接配置等）
│   ├── middlewares/   # 中间件
│   ├── app.ts         # 应用入口
│   └── server.ts      # 服务器启动
├── .env               # 环境变量
├── tsconfig.json      # TypeScript 配置
├── package.json       # 项目依赖
└── README.md          # 项目说明
```