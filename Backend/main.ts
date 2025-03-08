import express from "express";
import dbConnection from "./src/config/dbConnection";
import dotenv from "dotenv";
import mountedRoutes from "./src";
import { Server } from "http";

let server: Server;
const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));
dotenv.config({ path: "./process.env" });

dbConnection();
mountedRoutes(app);

server = app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err: any) => {
  console.error(`UNHANDLED REJECTION! ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    process.exit(1);
  });
});
