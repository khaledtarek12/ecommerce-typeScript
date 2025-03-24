import express from "express";
import dbConnection from "./src/config/dbConnection";
import dotenv from "dotenv";
import mountedRoutes from "./src";
import { Server } from "http";
import i18n from "i18n";
import path from "path";
import hpp from "hpp";

let server: Server;
const app: express.Application = express();
dotenv.config({ path: "./process.env" });
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(hpp({ whitelist: ["price"] }));
i18n.configure({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);
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
