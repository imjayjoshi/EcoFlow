import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import { registerRoutes } from "./routes";

const app: Express = express();

app.use(cors());
app.use(json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

registerRoutes(app);

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
