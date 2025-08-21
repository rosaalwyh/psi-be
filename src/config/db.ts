import "dotenv/config";
import pgPromise from "pg-promise";
import pgMonitor from "pg-monitor";

const pgp = pgPromise({
  query(e) {
    if (!process?.env?.DISABLE_SQL_LOG) {
      console.log(`\x1b[34m=====================QUERY====================\x1b[0m`);
      console.log(`\x1b[34m${e.query}\x1b[0m`);
      console.log(`\x1b[34m==============================================\x1b[0m`);
    }
  },
});

let dbConfig = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const db = pgp(dbConfig);

pgMonitor.attach({ pgp });

export default db;
