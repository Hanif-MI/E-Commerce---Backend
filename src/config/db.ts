import { Sequelize } from "sequelize";
import * as fs from "fs";
import * as dotenv from "dotenv";
import config from "./config";

dotenv.config();

const useSSL = process.env.TIDB_ENABLE_SSL === "true";

const dbConfig = config[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "mysql",
  dialectOptions: useSSL
    ? {
        ssl: {
          ca: fs.readFileSync(process.env.CA_PATH!, "utf8"),
        },
      }
    : {},
  logging: false,
});

export default sequelize;
