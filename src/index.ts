require("dotenv").config();
import express from "express";
import router from "./routers";
import db from "./config/db";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 80;

if (!db) {
  throw new Error("Database configuration is not set");
}

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello TypeScript + Express!");
});

app.use(router);
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await db
    .connect()
    .then(
      ({
        client: { database, port, host },
      }: {
        client: { database: string; port: number; host: string };
      }) => {
        console.log("Success connect to database");
        console.log(JSON.stringify({ database, port, host }, null, 2));
      }
    )
    .catch(({ code, address, port }: { code: number; address: string; port: number }) => {
      console.log("Failed connect to database");
      console.log(JSON.stringify({ code, address, port }, null, 2));
    });
});
