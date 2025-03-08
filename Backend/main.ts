import express from "express";
import dbConnection from "./src/config/dbConnection";
import dotenv from "dotenv";
import mountedRoutes from "./src";

const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));
dotenv.config({ path: "./process.env" });

dbConnection();
mountedRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
